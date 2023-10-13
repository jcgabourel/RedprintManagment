<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-btn @click="toggleTheme">toggle theme</v-btn>
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

<script setup>
import sideMenu from "~/components/sideMenu.vue";
import { useTheme } from "vuetify";

const drawer = ref(true);
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
