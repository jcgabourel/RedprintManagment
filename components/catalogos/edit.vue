<template>
  <forma :modelo="modelo" :data="data" :headers="headers" />
</template>

<script setup>
const props = defineProps(["modelo", "id"]);

const { data } = await useFetch(
  `http://127.0.0.1:8000/api/${props.modelo}/${props.id}`
);
const headers = Object.keys(data.value);
</script>
