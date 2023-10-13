<template>
  <forma modelo="categorias" :headers="headers" />
</template>

<script setup>
const dato2 = await useFetch(`/api/categorias/contract`);
const headers = Object.keys(dato2.data.value);
</script>
