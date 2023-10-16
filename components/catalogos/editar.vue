<template>
  <forma :contract="contrato.data"
    :modelo="modelo"
    :data="data"
    :relaciones="claves" />

  
</template>

<script setup>
const props = defineProps(["modelo", "id"]);
const claves = reactive({});

const { data } = await useFetch(
  `http://127.0.0.1:8000/api/${props.modelo}/${props.id}`
);
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
 
const headers = Object.keys(data.value);
</script>
