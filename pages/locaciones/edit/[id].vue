<template>
  <editar modelo="locaciones" :id="route.params.id" />
</template>

<script setup >
const route = useRoute();
</script>