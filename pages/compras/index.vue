<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title> Compras </v-toolbar-title>
      <template v-slot:append>
        <v-btn
          color="secondary"
          class="mb-2"
          v-bind="props"
          to="/compras/nueva"
        >
          Nueva
        </v-btn>
      </template>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Fecha</th>
          <th class="text-left">Proveedor</th>
          <th class="text-left">Total</th>

          <th class="text-left">Estatus</th>
          <th class="text-left">Accion</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in compras.data.value">
          <td>{{ item.fecha }}</td>
          <td>{{ item.proveedor.nombre }}</td>
          <td>{{ item.total }}</td>
          <td>
            <v-chip :color="item.estatus === 'Procesado' ? 'primary' : 'red'"
            @click="inresar(item.id)"
              ><td>{{ item.estatus }}</td>
              
              </v-chip
            >
          </td>

          <td>
            <v-col cols="auto">
              <v-btn density="compact" icon="mdi-magnify"   @click="ver(item.id)" /> &nbsp;
              <v-btn
                density="compact"
                icon="mdi-delete"
                @click="borrar(item.id)"
              />
            </v-col>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>

 
    <v-dialog v-model="dialog"   width="auto">
      <v-card>
        <v-card-text>
          <detallecompras :modelo="compraResumen"/>
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
const compras = await useFetch(`http://127.0.0.1:8000/api/compras`);
const dialog =ref(false)


const borrar = async (id) => {
  try {
    await useFetch(`http://127.0.0.1:8000/api/compras/${id}`, {
      method: "DELETE",
    });
    compras.data.value = compras.data.value.filter((nodo) => nodo.id !== id);
    console.log("intenta borrar", id);
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};

const ingresar = async (id)=>{
try {
  await useFetch(`http://127.0.0.1:8000/api/compras/${id}`, { 
      method: "PUT",
    });

}
catch (error) {
    console.error("Error al enviar datos:", error);
  }

}




const compraId = ref (0)
const compraResumen = ref (0)


const ver = (id)=>{
  compraResumen.value = compras.data.value.find(compra => compra.id === id);
  compraId.value =  id
  dialog.value = true

}
</script>
