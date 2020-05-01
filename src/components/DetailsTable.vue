<template>
  <v-data-table
    :headers="headers"
    :items="picked"
    :items-per-page="5"
    class="elevation-1"
    :multi-sort="true"
  ></v-data-table>
</template>

<script>
import _ from "lodash";
export default {
  name: "DetailsTable",
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      { text: "Item", value: "title" },
      { text: "Category", value: "category" },
      { text: "Cost ($)", value: "amount" },
      { text: "Date", value: "date" },
    ],
    picked: [],
  }),
  mounted: function() {
    this.events.forEach((item) => {
      const pickedObj = _.pick(item, ["title", "category", "amount", "date"]);
      this.picked.push(pickedObj);
    });
  },
};
</script>

<style lang="scss" scoped></style>
