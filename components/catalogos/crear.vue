<template>
  <forma :contract="contrato.data" :modelo="modelo" :otherdata="claves" />

 
</template>

<script setup>
const props = defineProps(["modelo"]);
const claves = reactive( {} );


const contrato = await useFetch(
  `http://127.0.0.1:8000/api/contracts/${props.modelo}`
);

for (const clave in contrato.data.value) {
  
    if (contrato.data.value[clave] === "nombre") {
      const datos = await useFetch(
        `http://127.0.0.1:8000/api/${clave}s`
      ) 
      claves[`${clave}`] =datos.data.value ;
      //claves.value.push(datos.data.value)

         
    }
  }
 

  
 
</script>