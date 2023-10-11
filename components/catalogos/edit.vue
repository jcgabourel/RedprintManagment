<template>
  <forma  :modelo="modelo" />
</template>

<script setup>
const props = defineProps(["modelo"]);

const { data } = await useFetch(`/api/${props.modelo}/`);
const headers = Object.keys(data.value[0]);
</script>