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
          <td v-for="(cell, cellIndex) in item" :key="cellIndex"> 
            <span v-if=" [ 'string','number'].includes(typeof cell)" >{{ cell }}</span> 
            <span v-else>{{  cell[contract.value[cellIndex]]}}         </span>
          </td>
          <td>
            <v-row>
              <v-col cols="auto">
                <v-btn
                  density="compact"
                  icon="mdi-pencil"
                  :to="rutaEdit + item.id"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  density="compact"
                  icon="mdi-delete"
                  @click="borrar(item.id)"
                />
              </v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-card-actions>
      <v-btn :to="'/'+props.modelo + '/nuevo'">Nuevo</v-btn>
    </v-card-actions>
  </v-card>
 
</template>

<script setup>
const props = defineProps(["contract", "data", "modelo"]);
const headers =  Object.keys( props.contract.value);

const dato = ref(props.data.value);


const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const rutaEdit = `/${props.modelo}/edit/`;

const haydatos = computed(() => {
  if (JSON.stringify(props.data.value) === "{}") return false;
  else return true;
});

const borrar = async (id) => {
  try {

    
    await useFetch(`http://127.0.0.1:8000/api/${props.modelo}/${id}`, {
      method: "DELETE",
    });

    dato.value = dato.value.filter((nodo) => nodo.id !== id);
    console.log("intenta borrar", id);

  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};
</script>
 
