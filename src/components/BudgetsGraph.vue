<template>
  <v-card :color="budget.color" dark>
    <v-card-text>
      <v-sparkline
        :value="budget.budgets"
        :labels="budget.labels"
        color="rgba(255, 255, 255, .7)"
        height="100"
        padding="24"
        stroke-linecap="round"
        smooth
      />
    </v-card-text>

    <v-card-text class="text-center">
      <div class="display-1">{{ budget.title }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "BudgetsGraph",
  props: {
    budget: {
      type: Object,
      required: true
    }
  }
};
</script>
