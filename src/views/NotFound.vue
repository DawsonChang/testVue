<template>
  <v-container class="action">
    <v-row>
      <v-col>
        <v-icon x-large>{{ mdiGoogleDownasaur }}</v-icon>
        <h1>Oops!</h1>
        <h3>The page you're looking for is not here.</h3>
        <div class="goBack">
          <router-link class="routerLink" :to="{ name: 'event-list' }">Back to the home page</router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiGoogleDownasaur } from "@mdi/js";
export default {
  data() {
    return {
      mdiGoogleDownasaur
    };
  }
};
</script>

<style scoped>
.action {
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.goBack {
  padding-top: 20px;
}
.routerLink {
  text-decoration: none;
}
.routerLink:hover {
  text-decoration: underline;
}
</style>