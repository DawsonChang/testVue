<template >
  <v-app id="App" :style="{background: $vuetify.theme.themes[theme].background}">
    <v-navigation-drawer
      v-model="drawer"
      class="primary accent-4"
      dark
      absolute
      temporary
      app
      style="position:fixed; top:0; left:0;"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link @click="listFunction(item)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="error" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark clipped-left app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="toolbarTitle" :to="{ name: 'event-list'}">BudgetTracker</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded>Search</v-btn>
      <v-avatar color="#F9A825" size="40">
        <span class="white--text headline">{{ getFirstLetter }}</span>
      </v-avatar>
    </v-app-bar>

    <v-content id="screen" class="pb-0">
      <v-container fluid class="ma-0 pa-0">
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import "nprogress/nprogress.css";
import { mdiArrowLeft } from "@mdi/js";
import { mdiViewDashboard } from "@mdi/js";
import { mdiAccountBox } from "@mdi/js";
import { mdiGavel } from "@mdi/js";
import { mdiPalette } from "@mdi/js";

export default {
  data: () => ({
    drawer: false,
    mdiArrowLeft,
    items: [
      { title: "Back", icon: mdiArrowLeft },
      { title: "Dashboard", icon: mdiViewDashboard },
      { title: "Theme", icon: mdiPalette },
      { title: "Account", icon: mdiAccountBox },
      { title: "Admin", icon: mdiGavel }
    ]
  }),
  methods: {
    listFunction(item) {
      switch (item.title) {
        case "Back":
          this.drawer = false;
          break;
        case "Dashboard":
          this.$router.push({
            name: "dash-board"
          });
          break;
        case "Theme":
          this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
          break;
        default:
          console.log(item.title);
      }
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    getFirstLetter() {
      const user = this.$store.state.user.user;
      return user.name.substring(0, 1);
    }
  }
};
</script>


<style scoped>
.toolbarTitle {
  text-decoration: none;
  color: white;
}
.toolbarTitle:hover {
  opacity: 50%;
}
#screen {
  min-height: 100%;
}
</style>
