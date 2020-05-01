<template>
  <v-container class="action" id="App">
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold">{{ event.event.title }}</h1>
        <div class="block">
          <h2 class="newFontTitle">Category</h2>
          <v-divider inset></v-divider>
          <h2 class="newFontContent">
            <v-icon large>{{ getIcon(event.event.category) }}</v-icon>
            {{ event.event.category }}
          </h2>
        </div>

        <div class="block">
          <h2 class="newFontTitle">Amount</h2>
          <v-divider inset></v-divider>
          <h2 class="newFontContent">
            <v-icon large>{{ mdiCashMultiple }}</v-icon>
            ${{ event.event.amount }}
          </h2>
        </div>

        <div class="block">
          <h2 class="newFontTitle">{{ `Date & Time` }}</h2>
          <v-divider inset></v-divider>
          <h2 class="newFontContent">
            <v-icon large>{{ mdiClockOutline }}</v-icon>
            {{ event.event.time }} on {{ event.event.date }}
          </h2>
        </div>

        <div class="block">
          <h2 class="newFontTitle">Location</h2>
          <h2 class="newFontContent">
            <v-divider inset></v-divider>
            <v-icon large>{{ mdiMapMarker }}</v-icon>
            {{ event.event.location }}
          </h2>
        </div>

        <div class="block">
          <h2 class="newFontTitle">Description</h2>
          <v-divider inset></v-divider>
          <h2 class="newFontContent">
            <v-icon large>{{ mdiMessageProcessingOutline }}</v-icon>
            {{ event.event.description }}
          </h2>
        </div>

        <button class="buttonFont">
          <router-link
            :to="{ name: 'event-list', query: { page: getPage }, params:{ isNext: true }}"
            rel="back"
          >Back</router-link>
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import { mdiCashMultiple } from "@mdi/js";
import { mdiClockOutline } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import { mdiMessageProcessingOutline } from "@mdi/js";

export default {
  props: ["id", "page"],
  data() {
    return {
      categories: this.$store.state.categories,
      mdiCashMultiple,
      mdiClockOutline,
      mdiMapMarker,
      mdiMessageProcessingOutline
    };
  },
  methods: {
    getIcon(category) {
      const curr = this.categories.find(cat => cat.name === category);
      return curr.icon;
    }
  },
  computed: {
    ...mapState(["event"]),
    getPage() {
      const lastPage = parseInt(this.$store.state.event.eventsTotal / 3) + 1;
      return this.page ? this.page : lastPage;
    }
  }
};
</script>
<style scoped>
html,
body,
#App {
  height: 130%;
}

.newFontTitle {
  font-family: "Kalam", cursive;
  font-size: 30px;
}
.newFontContent {
  font-family: "Source Code Pro", monospace;
  font-size: 20px;
}

.action {
  width: 40%;
  align-items: center;
  justify-content: center;
  height: 120vh;
}
.block {
  margin: 40px 0px;
}
.buttonFont {
  font-family: "Kalam", cursive;
  font-size: 20px;
}
</style>
