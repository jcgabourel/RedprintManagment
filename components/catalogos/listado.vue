<template>
    <tabla :data="dato.data" :headers="headers" :modelo="modelo" />  
  

   
</template>

<script setup>
  const props = defineProps(["modelo"]);

  const dato =   await useFetch(`/api/${props.modelo}/`);

  const dato2 = await useFetch(`/api/${props.modelo}/contract`); 

  const headers = Object.keys(dato2.data.value);
</script>