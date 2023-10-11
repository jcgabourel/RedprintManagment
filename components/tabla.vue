<template>
  <v-card :title="titulo">
    <v-table>
      <thead>
        <tr>
          <th class="text-left" v-for="(header, index) in headers" :key="index">
            {{ header }}
          </th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td v-for="(cell, cellIndex) in item" :key="cellIndex">{{ cell }}</td>
          <td>   <v-btn density="compact" icon="mdi-pencil" :to="rutaEdit" ></v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

 
</template>
 <script setup>
 const props =defineProps(['headers','data','titulo'])
 const rutaEdit = `${props.titulo}/edit`
  
 </script>
 
