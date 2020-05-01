<template>
  <v-card>
    <v-card-title class="headline">Do you want to delete this item?</v-card-title>
    <v-card-text class="title">{{ event.title }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="green darken-1" text @click="dialogClose">No</v-btn>

      <v-btn color="green darken-1" text @click="deleteEvent()">Yes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    event: Object
  },
  methods: {
    deleteEvent() {
      this.$store
        .dispatch("event/deleteEvent", this.event.id)
        .then(() => {
          this.$router.push({
            name: "event-list"
          });
        })
        .catch(() => {});
    },
    dialogClose() {
      // pass params to parent component
      this.$emit("dialogClose");
    }
  }
};
</script>

<style scoped>
</style>