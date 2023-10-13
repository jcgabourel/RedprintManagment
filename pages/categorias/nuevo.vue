<template>
    <forma   modelo="categorias"   :headers="headers" :uuid="uuid" />   
 
</template>

<script setup>
  const dato2 = await useFetch(`/api/categorias/contract`); 
  const headers = Object.keys(dato2.data.value);
const uuid = ref("")

    
 function generateUUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = (Math.random() * 16) | 0,
         v = c == 'x' ? r : (r & 0x3) | 0x8;
     return v.toString(16);
   });
 }


onMounted(() => {
  uuid.value = generateUUID()
  console.log('El componente se ha montado.',generateUUID() );
});

</script>
