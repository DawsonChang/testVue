<template>
  <v-container fluid class="mx-auto">
    <ul class="titleLine" align="center">
      <li>
        <h1 class="newFont">Budget for: {{ user.user.name }}</h1>
      </li>
      <li>
        <v-btn class="create" fab small dark color="primary" :to="{ name: 'event-create' }">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
      </li>
    </ul>

    <transition-group name="slide-right" tag="div" appear v-if="isNext">
      <EventCard v-for="event in event.events" :key="event.id" :event="event" :page="page" />
    </transition-group>

    <transition-group name="slide-left" tag="div" appear v-else>
      <EventCard v-for="event in event.events" :key="event.id" :event="event" :page="page" />
    </transition-group>

    <v-card width="400" class="mx-auto mt-5">
      <div class="pageBlock newFont">
        <div class="prevPage">
          <template v-if="page != 1">
            <router-link
              class="routerLink"
              :to="{ name: 'event-list', query: { page: page - 1 }, params:{ isNext: false } }"
              rel="prev"
            >{{ prevPage }}</router-link>
          </template>
        </div>

        <div class="nextPage">
          <template v-if="hasNextPage">
            <router-link
              class="routerLink"
              :to="{ name: 'event-list', query: { page: page + 1 }, params:{ isNext: true } }"
              rel="next"
            >{{ nextPage }}</router-link>
          </template>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/store";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    })
    .catch(() => {
      next({ name: "network-issue" });
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    isNext: {
      type: Boolean
    }
  },

  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    prevPage() {
      return "<<Prev Page";
    },
    nextPage() {
      return "Next Page>>";
    },
    ...mapState(["event", "user"])
  }
};
</script>

<style scoped>
.newFont {
  font-family: "Kalam", cursive;
}

.titleLine {
  text-align: center;
}
.titleLine li {
  padding-left: 20px;
  padding-right: 20px;
  display: inline-block;
}
.create {
  opacity: 1;
}
.create:hover {
  transform: scale(1.1);
}
.pageBlock {
  margin-bottom: 50px;
}
.prevPage {
  float: left;
}
.nextPage {
  float: right;
}
.routerLink {
  text-decoration: none;
}
.routerLink:hover {
  text-decoration: underline;
}

.slide-right-enter {
  transform: translateX(200px);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 1s ease;
}

.slide-left-enter {
  transform: translateX(-200px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 1s ease;
}
</style>
