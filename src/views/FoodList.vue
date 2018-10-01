<template>
    <v-container fluid>
        <v-alert :value=isClosed type="info" dismissible transition="slide-y-transition">
            This list has been closed
        </v-alert>
        <v-tabs v-model="activeTab">
            <v-tab v-if=!isClosed ripple>Submit</v-tab>
            <v-tab ripple>Participants</v-tab>
            <v-tab ripple>Options</v-tab>
            <!-- Submission list -->
            <v-tab-item v-if=!isClosed>
                <v-slide-y-transition mode="out-in">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-layout column wrap>
                            <v-flex>
                                <v-text-field v-model=name label="Name" :rules="[v => !!v || 'Name is required']" required>
                                </v-text-field>
                            </v-flex>
                            <v-layout row>
                                <v-flex>
                                    <v-checkbox v-model="veggy" label="Veggy"></v-checkbox>
                                </v-flex>
                                <v-flex>
                                    <v-checkbox v-model="persistent" label="Full-time"></v-checkbox>
                                </v-flex>
                            </v-layout>
                            <v-flex>
                                <v-text-field v-model=notes label="Notes">
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout column align-center>
                            <v-btn @click="submit">submit</v-btn>
                        </v-layout>
                    </v-form>

                </v-slide-y-transition>
            </v-tab-item>

            <!-- Participants list -->
            <v-tab-item>
                <v-data-table :headers="headers" :items="list.users" hide-actions>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td>
                            <v-icon v-if=props.item.veggy>check</v-icon>
                        </td>
                        <td>
                            <v-icon v-if=props.item.persistent>check</v-icon>
                        </td>
                    </template>
                </v-data-table>
            </v-tab-item>

            <!-- Options list -->
            <v-tab-item>
                <v-btn @click=closeList color="warning" :disabled=isClosed>Close List</v-btn>
                <v-btn @click=deleteList color="error" disabled>Delete List</v-btn>
            </v-tab-item>

        </v-tabs>

        <v-snackbar v-model=submitted>Added to list!</v-snackbar>

    </v-container>
</template>

<script>
export default {
  name: "FoodList",
  props: ["id"],
  mounted() {},
  data() {
    return {
      headers: [
        { text: "Name", value: "name", sortable: true },
        { text: "Veggy", value: "veggy", sortable: true },
        { text: "Full-time", value: "persistent", sortable: true }
      ],
      activeTab: null,
      submitted: false,
      valid: true,
      list: [],
      listRef: this.$db.collection("lists").doc(this.id),
      name: "",
      veggy: false,
      notes: "",
      persistent: false
    };
  },
  methods: {
    deleteList() {
      return this.$db
        .collection("lists")
        .doc(this.id)
        .set({ deleted_at: new Date() }, { merge: true });
    },
    closeList() {
      if (!this.isClosed) {
        this.activeTab = 0;
        return this.listRef.set({ closed_at: new Date() }, { merge: true });
      }
    },
    mutateUser(user) {
      return this.$db
        .collection("users")
        .doc(user.name.toLowerCase())
        .set(user);
    },
    submit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      let user = {
        veggy: this.veggy,
        name: this.name,
        persistent: this.persistent
      };

      this.mutateUser(user)
        .then(() => {
          this.list.users.push(
            Object.assign({ notes: this.notes, signed_up_at: new Date() }, user)
          );
        })
        .then(() => {
          // @todo: check if user already exists in this.lists.users
          return this.$db
            .collection("lists")
            .doc(this.id)
            .set({ users: this.list.users }, { merge: true });
        })
        .then(response => {
          this.submitted = true;
        });
    }
  },
  computed: {
    isClosed: function() {
      if (
        this.list.closed_at != undefined ||
        this.list.deleted_at != undefined
      ) {
        return true;
      }
      return false;
    },
    isDeleted: function() {
      if (this.list.deleted_at != undefined) {
        return true;
      }
      return false;
    }
  },
  firestore() {
    return {
      list: this.$db.collection("lists").doc(this.id)
    };
  }
};
</script>

<style scoped>
</style>
