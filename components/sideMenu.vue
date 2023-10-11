<template>

<div>
  <v-list>
    <v-list-group value="Inventarios">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-circle"
          title="Inventarios"
        ></v-list-item>
      </template>
      <v-list-item value="productos" title="Productos" to="/productos" />

      <v-list-group value="catalogos">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Catalogos"></v-list-item>
        </template>
        <v-list-item value="categorias" title="Caegorias" to="/categorias" />
        <v-list-item value="marcas" title="Marcas" to="/marcas" />
      </v-list-group>
    </v-list-group>
  </v-list>
</div>
</template>
