import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as event from "@/store/modules/event.js";
import { mdiFormSelect } from "@mdi/js";
import { mdiCar } from "@mdi/js";
import { mdiSchool } from "@mdi/js";
import { mdiGamepadVariant } from "@mdi/js";
import { mdiHome } from "@mdi/js";
import { mdiFood } from "@mdi/js";
import { mdiGift } from "@mdi/js";
import { mdiHospitalBox } from "@mdi/js";
import { mdiBasket } from "@mdi/js";
import { mdiSubwayVariant } from "@mdi/js";
import { mdiBeach } from "@mdi/js";
import { mdiDomain } from "@mdi/js";
import { mdiJellyfish } from "@mdi/js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
  },
  state: {
    categories: [
      {
        name: "Bill & Fees",
        icon: mdiFormSelect,
      },
      {
        name: "Car",
        icon: mdiCar,
      },
      {
        name: "Education",
        icon: mdiSchool,
      },
      {
        name: "Entertainment",
        icon: mdiGamepadVariant,
      },
      {
        name: "Family & Personal",
        icon: mdiHome,
      },
      {
        name: "Food & Drink",
        icon: mdiFood,
      },
      {
        name: "Gifts",
        icon: mdiGift,
      },
      {
        name: "Healthcare",
        icon: mdiHospitalBox,
      },
      {
        name: "Shopping",
        icon: mdiBasket,
      },
      {
        name: "Transport",
        icon: mdiSubwayVariant,
      },
      {
        name: "Travel",
        icon: mdiBeach,
      },
      {
        name: "Work",
        icon: mdiDomain,
      },
      {
        name: "Other",
        icon: mdiJellyfish,
      },
    ],
  },
});
