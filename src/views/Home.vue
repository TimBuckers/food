<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>

      <food-card v-for="(item,idx) in lists" :key=idx :item=item></food-card>
      <!-- <food-list v-for="(item,idx) in lists" :key=idx :id=item.id /> -->
    </v-layout>

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
  </v-container>
</template>

<script>
import FoodCard from "./FoodCard.vue";
import FoodList from "./FoodList.vue";
export default {
  name: "Overview",
  components: { FoodList, FoodCard },
  data() {
    return {
      show: true,
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
          return this.$db.collection("lists").add(list);
        })
        .then(response => {
          list.id = response.id;
        });
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
