<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-data-table :headers="headers" :items="lists" hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>
                <v-icon v-if="props.item.type == 'lunch'">restaurant</v-icon>
                <v-icon v-if="props.item.type == 'dinner'">local_cafe</v-icon>
              </td>
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
        <v-speed-dial fixed bottom right>
          <v-btn slot="activator" color="blue darken-2" dark fab>
            <v-icon>add</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn @click="newList('lunch')" fab dark small color="green">
            <v-icon>restaurant</v-icon>
          </v-btn>
          <v-btn @click="newList('dinner')" fab dark small color="red">
            <v-icon>local_cafe</v-icon>
          </v-btn>
        </v-speed-dial>
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
        { text: "", value: "type", sortable: false },
        { text: "Opened at", value: "created_at", sortable: false },
        { text: "Closed at", value: "closed_at", sortable: false },
        { text: "Amount", value: "amount", sortable: false },
        { text: "Veggy", value: "veggy", sortable: false }
      ],
      lists: []
    };
  },
  mounted() {},
  methods: {
    getUserAmount(users) {
      return users.length;
    },
    newList(type) {
      let list = {
        created_at: new Date(),
        users: [],
        type: type
      };

      this.getPersistentUsers()
        .then(users => {
          users.forEach(doc => {
            list.users.push(
              Object.assign({ signed_up_at: new Date() }, doc.data())
            );
          });
        })
        .then(() => {
          console.log(list);
          this.$db.collection("lists").add(list);
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
    },
    getPersistentUsers() {
      return this.$db
        .collection("users")
        .where("persistent", "==", true)
        .get();
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
