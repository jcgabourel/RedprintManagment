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
      <tbody v-if="haydatos">
         <tr v-for="item in dato" :key="item.id">
        
            <td v-for="(cell,cellIndex ) in item"  :key="cellIndex">{{ cell }}</td>  
           <td>
            <v-btn
              density="compact"
              icon="mdi-pencil"
              :to="rutaEdit + item.id"
            ></v-btn>
          </td>    
        </tr> 
      </tbody>
    </v-table>

    <v-card-actions>
      <v-btn :to="props.modelo + '/nuevo'">Nuevo</v-btn>
    </v-card-actions>
  </v-card>
 
</template>
 <script setup>
const props = defineProps(["headers", "data", "modelo"]);
const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const rutaEdit = `/${props.modelo}/edit/`;

const haydatos = computed(() => {
  if (JSON.stringify(props.data.value) === "{}") return false;
  else return true;
});



const dato =  props.data.value
 

</script>
 
