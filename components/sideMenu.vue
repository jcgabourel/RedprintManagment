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

        <v-list-group value="stock">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Stock"></v-list-item>
          </template>
          <v-list-item
            value="existencias"
            title="Existencias"
            to="/existencias"
          />
          <v-list-item
            value="movimientos"
            title="Movimientos"
            to="/movimientos"
          />
        </v-list-group>
      </v-list-group>
      <v-list-group value="Compras">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="Compras"
          ></v-list-item>
        </template>
        <v-list-item value="Compras" title="Compras" to="/compras" />
      </v-list-group>

      <v-list-group value="catalogos">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Catalogos"></v-list-item>
        </template>
        <v-list-item value="categorias" title="Caegorias" to="/categorias" />
        <v-list-item value="marcas" title="Marcas" to="/marcas" />
        <v-list-item value="locaciones" title="Locaciones" to="/locaciones" />
        <v-list-item value="proveedores" title="Proveedores" to="/proveedores" />
      </v-list-group>
    </v-list>
  </div>
</template>
