import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        background: "#F5F5F5",
      },
      dark: {
        primary: "#3f51b5",
        anchor: "#8c9eff",
        error: "#b71c1c",
        eventCard: "#EEEEEE",
        background: "#212121",
      },
    },
  },
});
