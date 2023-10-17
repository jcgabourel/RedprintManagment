<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title  > Stock </v-toolbar-title>
       
    </v-toolbar>
     

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Producto</th>
          <th class="text-left">Locacion</th>
          <th class="text-left">Cantidad</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in existencias.data.value">
          <td>
            <span>{{ item.nombre }} </span>
          </td>
          <td>
            <span>
              <v-chip v-for="chip in item.existencias" class="ma-2">
                {{ chip.locacion.nombre }}
              </v-chip>
            </span>
          </td>
          <td>
            <span>{{ item.existencias_suma }} </span>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
const existencias = await useFetch(`http://127.0.0.1:8000/api/existencias`);
</script>
