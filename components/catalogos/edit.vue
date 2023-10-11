<template>
     <forma  :modelo="modelo" :data="data"  :headers="headers"/>    
 
</template>

<script setup>
const props = defineProps(["modelo","id"]);

 const { data } = await useFetch(`/api/${props.modelo}/${props.id}`);
 const headers = Object.keys(data.value);
</script>