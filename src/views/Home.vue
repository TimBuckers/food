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
              <td>{{ getUserAmount(props.item.users)}}</td>
              <td>{{ getVeggyAmount(props.item.users) }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <food-list :id=props.item.id :listProp=props.item></food-list>
            </v-card>
          </template>
        </v-data-table>
        <!-- <v-btn @click="newList">New</v-btn> -->
        <v-btn @click="newList" dark fab fixed bottom right color="#126287">
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import FoodList from "./FoodList.vue";
export default {
  name: "Overview",
  components: { FoodList },
  data() {
    return {
      loading: true,
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
  mounted() { },
  methods: {
    getUserAmount(users) {
      return users.length;
    },
    newList() {
      let list = {
        created_at: new Date(),
        users: [],
        type: "lunch"
      };
      this.$db
        .collection("lists")
        .add(list)
        .then(response => {
          // @todo: automatically open new list
        });
    },
    toDate(item) {
      if (item == undefined) {
        return "-";
      }
      return item.toDate().toLocaleTimeString("nl-NL");
    },
    getVeggyAmount(users) {
      return users.filter(user => {
        return user.veggy;
      }).length;
    }
  },

  firestore() {
    return {
      lists: this.$db.collection("lists").orderBy("created_at", "desc")
    };
  }
};
</script>

<style scoped>
</style>
