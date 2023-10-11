<template>
  <tabla :data="data" :headers="headers" titulo="Marcas" />
</template>

<script setup>
const { data } = await useFetch("/api/marcas");
const headers = Object.keys(data.value[0]);
</script>
