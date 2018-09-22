<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                {{participants}}
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
export default {
  name: "FoodList",
  props: ["participants"],
  mounted() {},
  methods: {},
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
