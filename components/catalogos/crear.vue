<template>
  <forma :modelo="modelo" :headers="headers" />
</template>

<script setup>
 const props = defineProps(["modelo"]);
const dato2 = await useFetch(`http://127.0.0.1:8000/api/contracts/${props.modelo}`);
const headers = Object.keys(dato2.data.value);
</script>