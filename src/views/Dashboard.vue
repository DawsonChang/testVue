<template>
  <v-container>
    <h1>Dashboard</h1>

    <v-row>
      <v-col
        v-for="budget in budgets"
        :key="`${budget.title}`"
        cols="12"
        md="4"
      >
        <BudgetsGraph :budget="budget" />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="statistic in statistics"
        :key="`${statistic.title}`"
        cols="12"
        md="6"
        lg="3"
      >
        <StatisticCard :statistic="statistic" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <DetailsTable :events="event.events" />
      </v-col>

      <v-col cols="12" md="4">
        <EventTimeline :timeline="event.events" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BudgetsGraph from "../components/BudgetsGraph";
import StatisticCard from "../components/StatisticCard";
import DetailsTable from "../components/DetailsTable";
import EventTimeline from "../components/EventTimeline";

// import timelineData from "../data/timeline.json";
import BudgetData from "../data/bugets.json";

import store from "@/store/store";
import { mapState } from "vuex";

function getPageEvents(routeTo, next) {
  store
    .dispatch("event/fetchEventsDashBoard")
    .then(() => {
      next();
    })
    .catch(() => {
      next({ name: "network-issue" });
    });
}

export default {
  name: "DashboardPage",
  components: {
    BudgetsGraph,
    StatisticCard,
    DetailsTable,
    EventTimeline,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },

  data() {
    return {
      budgets: BudgetData,
      // timeline: timelineData,
      statistics: [
        {
          title: "Number of Budgets",
          value: 0,
        },
        {
          title: "Max Budget",
          value: 0,
        },
        {
          title: "Total Cost",
          value: 0,
        },
        {
          title: "Average Per Day",
          value: 0,
        },
      ],
    };
  },
  mounted: function() {
    // get how many budgets you have
    this.statistics[0].value = this.event.events.length;

    // get the other statistic data
    let maxBudget = 0;
    let totalCost = 0;
    this.event.events.forEach((item) => {
      if (parseInt(item.amount) > maxBudget) maxBudget = parseInt(item.amount);
      totalCost += parseInt(item.amount);
    });
    this.statistics[1].value = maxBudget;
    this.statistics[2].value = totalCost;
    this.statistics[3].value = Math.round(totalCost / 30);
  },
  computed: {
    ...mapState(["event", "user"]),
  },
};
</script>
