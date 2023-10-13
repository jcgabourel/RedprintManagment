<template>
    <tabla :data="dato.data" :headers="headers" :modelo="modelo" />     
</template>

<script setup>
  const props = defineProps(["modelo"]);
  const dato =   await useFetch(`http://127.0.0.1:8000/api/${props.modelo}/`);
  const dato2 = await useFetch(`http://127.0.0.1:8000/api/contracts/${props.modelo}`); 
  const headers = Object.keys(dato2.data.value);
</script>