<template>
  <edit modelo="locaciones" :id="route.params.id" />
</template>

<script setup>
import edit from "~/components/catalogos/edit.vue";
const route = useRoute();
</script>
