<template>
  <forma :contract="contrato.data" :modelo="modelo" :relaciones="claves" />

 
</template>

<script setup>
const props = defineProps(["modelo"]);
const claves = reactive( {} );


const contrato = await useFetch(
  `http://127.0.0.1:8000/api/contracts/${props.modelo}`
);

for (const clave in contrato.data.value) {
  

    if (contrato.data.value[clave] === "nombre") {
        console.log("vamos",clave);
      const datos = await useFetch(
        `http://127.0.0.1:8000/api/${clave}s`
      ) 
   
       
      claves[`${clave}`] =[...datos.data.value,{id:0,nombre:"Nueva Categoria.."} ]
 

         
    }
  }
  
 

  
 
</script>