<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/dashboard">Dashboard</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="pa-3">&copy; Nick Tsutsunava 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {},
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      title: "MARCH Food List"
    };
  }
};
</script>
