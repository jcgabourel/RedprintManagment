<template>
  <!-- <tabla :data="dato.data" :contract="contrato.data" modelo="detallecompras" />     -->

  <v-card title="Detalle">
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
        <tr v-for="item in dato.data.value" :key="item.id">
            <td >{{ item.id }} </td>
            <td >{{ item.producto.nombre }} </td>
            <td >{{ item.cantidad }} </td>
            <td >{{ item.precio }} </td>
            <td><v-btn
                  density="compact"
                  icon="mdi-pencil"  
                  @click="dialog = true"                 
                /></td>
          <!-- <td>
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
          </td>  -->
        </tr>
      </tbody> 
    </v-table>

    <!-- <v-card-actions>
      <v-btn :to="'/' + props.modelo + '/nuevo'">Nuevo</v-btn>
    </v-card-actions> -->
  </v-card>
  



    <v-dialog v-model="dialog"   width="auto">
      <v-card>
        <v-card-text>
           <detalle-entradas />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>




</template>

<script setup>
const props = defineProps(["modelo"]);
const dato = await useFetch(
  `http://127.0.0.1:8000/api/detallecompras/${props.modelo}`
);
const contrato = await useFetch(
  `http://127.0.0.1:8000/api/contracts/detallecompras`
); 
const headers = Object.keys(contrato.data.value);

  const haydatos = computed(() => {
    if (JSON.stringify(dato.data.value) === "{}") return false;
    else return true;
  });



  const dialog = ref(false)

</script>
