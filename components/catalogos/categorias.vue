<template>
  <tabla :data="data" :headers="headers" titulo="Categorias" />
</template>

<script setup>
const { data } = await useFetch("/api/categorias");
const headers = Object.keys(data.value[0]);
</script>