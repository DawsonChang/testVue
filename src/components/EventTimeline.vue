<template>
  <v-timeline align-top :dense="true">
    <v-timeline-item
      v-for="(item, i) in timeline"
      :key="i"
      :icon="item.icon"
      fill-dot
    >
      <v-card color="#FF9800" dark>
        <v-card-title class="title pt-3 pb-3">
          <h3 class="titleText">{{ item.title }}</h3>
        </v-card-title>
        <v-card-text class="white">
          <p class="pt-3 mb-0 cardText">
            <v-icon color="black">{{ mdiCashMultiple }}</v-icon>
            ${{ item.amount }}
            <br />
            <v-icon color="black">{{ mdiClockOutline }}</v-icon
            >{{ item.date }}
          </p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mdiClockOutline } from "@mdi/js";
import { mdiCashMultiple } from "@mdi/js";
export default {
  name: "EventTimeline",
  props: {
    timeline: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      categories: this.$store.state.categories,
      mdiClockOutline,
      mdiCashMultiple,
    };
  },
  mounted: function() {
    // sort timeline by date
    this.timeline.sort(this.compare);
    this.timeline.forEach((item) => {
      item.icon = this.getIcon(item.category);
    });
    console.log(this.timeline);
  },
  methods: {
    getIcon(category) {
      const curr = this.categories.find((cat) => cat.name === category);
      return curr.icon;
    },
    compare(a, b) {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.titleText {
  font-size: 24px;
}
.cardText {
  color: black;
  font-size: 16px;
}
</style>
