<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-data-table :headers="headers" :items="lists" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.type }}</td>
              <td>{{ toDate(props.item.created_at) }}</td>
              <td>{{ toDate(props.item.closed_at) }}</td>
              <td>{{ props.item.users.length }}</td>
              <td>{{ getVeggyAmount(props.item.users) }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <food-list :participants=props.item></food-list>
            </v-card>
          </template>
        </v-data-table>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import FoodList from "./FoodList.vue";
export default {
  name: "Overview",
  components: { FoodList },
  mounted() {},
  methods: {
    toDate(item) {
      if (item == undefined) {
        return "-";
      }
      return item.toDate().toLocaleTimeString("nl-NL");
    },
    getVeggyAmount(collection) {
      return collection.filter(user => {
        return user.veggy;
      }).length;
    }
  },
  data() {
    return {
      headers: [
        { text: "Type", value: "type", sortable: false },
        { text: "Opened at", value: "created_at", sortable: false },
        { text: "Closed at", value: "closed_at", sortable: false },
        { text: "Amount", value: "amount", sortable: false },
        { text: "Veggy", value: "veggy", sortable: false }
      ],
      lists: []
    };
  },
  firestore() {
    return {
      lists: this.$db.collection("lists")
    };
  }
};
</script>

<style scoped>
</style>
