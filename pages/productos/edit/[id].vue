<template>
  <editar modelo="productos" :id="route.params.id" />
</template>

<script setup >
const route = useRoute();
</script>