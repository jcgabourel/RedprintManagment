<template>
  <forma
    :contract="contrato.data"
    :modelo="modelo"
    :relaciones="claves"
    :dontGoToList="dontGoToList"
    @formaSubmited="formaSubmitedHandler"
    @finsubcaptura="finsubcapturaHandler"
  />

   
</template>

<script setup>
const props = defineProps(["modelo", "dontGoToList"]);
const claves = reactive({});
const emit = defineEmits(["crearSubmited"]);

const contrato = await useFetch(
  `http://127.0.0.1:8000/api/contracts/${props.modelo}`
);

  

for (const clave in contrato.data.value) {
  if (contrato.data.value[clave] === "nombre") {
    const datos = await useFetch(`http://127.0.0.1:8000/api/${clave}s`);
    claves[`${clave}`] = [
      ...datos.data.value,
      { id: 0, nombre: "Nueva Categoria.." },
    ];
  }
}
 
async function  finsubcapturaHandler(){

  for (const clave in contrato.data.value) {
  if (contrato.data.value[clave] === "nombre") {
    const datos = await useFetch(`http://127.0.0.1:8000/api/${clave}s`);
    claves[`${clave}`] = [
      ...datos.data.value,
      { id: 0, nombre: "Nueva Categoria.." },
    ];
  }
}


}
function formaSubmitedHandler(cual) {
    
  emit("crearSubmited",cual);
}
</script>