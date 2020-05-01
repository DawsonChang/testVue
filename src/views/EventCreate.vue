<template>
  <v-container class="action" id="App">
    <v-row>
      <v-col>
        <h1 class="newFontTitle">Create a new budget</h1>
        <v-form
          @submit.prevent="createEvent"
          id="check-form"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="newEvent.title"
            label="Title"
            type="text"
            :rules="titleRules"
            required
          ></v-text-field>

          <br />

          <v-select
            v-model="newEvent.category"
            :items="categories"
            name="category"
            label="Select a category"
            item-text="name"
            return-object
            hide-details
            single-line
            :rules="categoryRules"
            required
          >
            <template slot="selection" slot-scope="data">
              <span>
                <v-icon>{{ data.item.icon }}</v-icon>
              </span>
              <span class="secondSpan">{{ data.item.name }}</span>
            </template>
            <template slot="item" slot-scope="data">
              <v-avatar>
                <span>
                  <v-icon>{{ data.item.icon }}</v-icon>
                </span>
              </v-avatar>

              <span class="secondSpan">
                {{ data.item.name }}
              </span>
            </template>
          </v-select>

          <br />

          <v-text-field
            v-model="newEvent.amount"
            label="Cost"
            type="text"
            :rules="amountRules"
            required
          ></v-text-field>

          <br />

          <v-menu
            v-model="fromDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Select a date"
                readonly
                :value="fromDateDisp"
                v-on="on"
                :rules="dateRules"
                required
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="fromDateVal"
              no-title
              @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>
          <br />
          <v-select
            v-model="newEvent.time"
            :items="times"
            label="Select a time"
          ></v-select>
          <br />
          <h3>Where you comsume?</h3>
          <v-text-field
            v-model="newEvent.location"
            label="Location"
            type="text"
          ></v-text-field>

          <v-textarea
            v-model="newEvent.description"
            auto-grow
            label="Description"
            rows="4"
            row-height="30"
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            type="submit"
            color="success"
            form="check-form"
            @click="validate"
            >Submit</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";

export default {
  components: {
    // Datepicker
  },
  created() {
    // clean up the event object
    this.newEvent = this.createFreshEventObject();
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      newEvent: this.createFreshEventObject(),
      fromDateMenu: false,
      fromDateVal: null,
      valid: true,
      titleRules: [(v) => !!v || "Title is required"],
      categoryRules: [(v) => !!v || "Category is required"],
      amountRules: [
        (v) => !!v || "Cost is required",
        (v) => /^\d+$/.test(v) || "Cost must be number",
        (v) => /^[^0]/.test(v) || "Cost must be a valid number",
      ],
      dateRules: [(v) => !!v || "Date is required"],
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.newEvent.date = this.fromDateVal;
      this.newEvent.category = this.newEvent.category.name;
      this.$store
        .dispatch("event/createEvent", this.newEvent)
        .then(() => {
          // redirect to event-show page
          this.$router.push({
            name: "event-show",
            params: { id: this.newEvent.id },
          });
        })
        .catch(() => {
          NProgress.done();
        });
    },
    createFreshEventObject() {
      const id = Math.floor(Math.random() * 100000);
      const user = this.$store.state.user.user;

      return {
        id: id,
        user: user,
        title: "",
        category: "",
        amount: "",
        date: "",
        time: "0:00",
        location: "",
        description: "",
      };
    },
    validate() {
      this.$refs.form.validate();
    },
  },
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
    },
  },

  watch: {
    pickerDate() {
      this.notes = [
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
      ].filter((value, index, self) => self.indexOf(value) === index);
    },
  },
};
</script>

<style scoped>
html,
body,
#App {
  height: 120%;
}

.newFontTitle {
  font-family: "Kalam", cursive;
  font-size: 40px;
}

.field {
  margin-bottom: 24px;
}
.secondSpan {
  display: inline-block;
  margin-left: 8px;
}

.action {
  width: 40%;
  align-items: center;
  justify-content: center;
  height: 140px;
}
</style>
