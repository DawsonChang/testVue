import EventService from "@/services/EventService.js";
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3,
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTSTOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  REMOVE_EVENT(state, event) {
    state.events = state.events.filter((e) => e !== event);
  },
};

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating your event: " + error.message
        );
      });
  },
  fetchEvents({ commit, state }, { page }) {
    return EventService.getEvents(state.perPage, page).then((response) => {
      commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
      commit("SET_EVENTS", response.data);
    });
    // .catch(error => {
    //   console.log('There was a problem creating your event: ' + error.message)
    // })
  },
  fetchEventsDashBoard({ commit }) {
    return EventService.getEventsDashBoard().then((response) => {
      commit("SET_EVENTS", response.data);
    });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      return EventService.getEvent(id).then((response) => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
    }
  },
  deleteEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    EventService.deleteEvent(id)
      .then(() => {
        commit("REMOVE_EVENT", event);
      })
      .catch((error) => {
        console.log(
          "There was a problem deleting your event: " + error.message
        );
      });
  },
};
export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
