<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left">
      <side-menu />
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <v-row>
        <v-col>
          <v-container>
            <slot />
          </v-container>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script>
import sideMenu from "~/components/sideMenu.vue";

export default {
  components: { sideMenu },
  data: () => ({
    drawer: true,
  }),
};
</script>
