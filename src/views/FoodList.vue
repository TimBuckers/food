<template>
    <v-container fluid>
        <v-tabs v-model="activeTab">
            <v-tab ripple>Submit</v-tab>
            <v-tab ripple>Participants</v-tab>
            <v-tab-item>
                <v-slide-y-transition mode="out-in">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field v-model=name label="Name" :rules="[v => !!v || 'Name is required']" required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs6>
                                <v-checkbox v-model="veggy" label="Veggy"></v-checkbox>
                            </v-flex>
                            <v-flex xs6>
                                <v-checkbox v-model="persistent" label="Full-time"></v-checkbox>
                            </v-flex>
                            <v-flex xs12>
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

            <v-tab-item>
                <v-data-table :headers="headers" :items="list.users" hide-actions>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.veggy }}</td>
                        <td>{{ props.item.persistent }}</td>
                    </template>
                </v-data-table>
            </v-tab-item>
        </v-tabs>

        <v-snackbar v-model=submitted>Added to list!</v-snackbar>

    </v-container>
</template>

<script>
export default {
    name: "FoodList",
    props: ["id"],
    mounted() { },
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
            name: "",
            veggy: false,
            notes: "",
            persistent: false,
        };
    },
    methods: {
        mutateUser(user) {
            return this.$db.collection('users').doc(user.name.toLowerCase()).set(user)
        },
        submit() {
            if (!this.$refs.form.validate()) {
                return
            }
            let user = {
                veggy: this.veggy,
                name: this.name,
                persistent: this.persistent
            }

            this.mutateUser(user).then(() => {
                this.list.users.push(Object.assign({ notes: this.notes }, user))
            }).then(() => {
                // @todo: check if user already exists in this.lists.users
                return this.$db.collection("lists")
                    .doc(this.id)
                    .set({ users: this.list.users }, { merge: true })
            }).then(response => {
                this.submitted = true
            });
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
