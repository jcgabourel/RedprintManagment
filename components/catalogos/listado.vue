<template>   
    <tabla :data="dato.data" :contract="contrato.data" :modelo="modelo" /> 

   
</template>

<script setup>
  const props = defineProps(["modelo"]);
  const dato =   await useFetch(`http://127.0.0.1:8000/api/${props.modelo}/`);
  const contrato = await useFetch(`http://127.0.0.1:8000/api/contracts/${props.modelo}`); 
  //const headers = Object.keys(contrato.data.value);
</script>