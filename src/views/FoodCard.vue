<template>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
            <v-layout row>
                <v-flex xs7>
                    <v-card-title primary-title>
                        <div class="headline">{{this.item.type}}</div>
                    </v-card-title>
                </v-flex>
                <v-flex xs5>
                    <v-card-title>
                        <div>
                            <div>Opened: {{this.createdAt}} </div>
                            <div>Closed: {{this.closedAt}}</div>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">
                Participants: {{this.users}}
                Veggy: {{this.veggyUsers}}
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
                <v-card-text v-show="show">
                    <food-list :list=this.item></food-list>
                </v-card-text>
            </v-slide-y-transition>
        </v-card>
    </v-flex>
</template>

<script>
import FoodList from "./FoodList.vue";

export default {
  name: "FoodCard",
  components: { FoodList },
  props: ["item"],
  data() {
    return {
      show: false
    };
  },
  computed: {
    colorType: function() {
      if (this.item.type == "lunch") {
        return "green lighten-5";
      }
      return "orange lighten-5";
    },
    users: function() {
      return this.item.users.length;
    },
    veggyUsers: function() {
      return this.item.users.filter(user => {
        return user.veggy;
      }).length;
    },
    createdAt: function() {
      return this.item.created_at.toDate().toLocaleTimeString("nl-NL");
    },
    closedAt: function() {
      if (this.item.closed_at == undefined) {
        return "-";
      }
      return this.item.created_at.toDate().toLocaleTimeString("nl-NL");
    }
  },
  methods: {}
};
</script>

<style>
.headline {
  text-transform: capitalize;
}
</style>
