import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";
import Dashboard from "./views/Dashboard.vue";
import NotFound from "./views/NotFound.vue";
import NetworkIssue from "./views/NetworkIssue.vue";
import store from "@/store/store";
import NProgress from "nprogress";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/testVue",
      name: "event-list",
      component: EventList,
      props: true,
    },
    {
      path: "/testVue/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({
                name: "404",
                params: { resource: "event" },
              });
            } else {
              next({ name: "network-issue" });
            }
          });
      },
    },
    {
      path: "/testVue/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/testVue/dashboard",
      name: "dash-board",
      component: Dashboard,
      props: true,
    },
    {
      path: "/testVue/network-issue",
      name: "network-issue",
      component: NetworkIssue,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true,
    },
    {
      path: "*",
      redirect: { name: "404", params: { resource: "page" } },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
