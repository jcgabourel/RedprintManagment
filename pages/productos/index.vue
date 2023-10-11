<template>
  <tabla :data="data" :headers="headers" titulo="Productos" />
</template>

<script setup>
const { data } = await useFetch("/api/productos");
const headers = Object.keys(data.value[0]);
</script>
