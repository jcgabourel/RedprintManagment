<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title> Compras </v-toolbar-title>
      <template v-slot:append>
        <v-btn color="secondary" class="mb-2" v-bind="props" to="/compras/nueva"> Nueva </v-btn>        
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
          <td>33</td>
          <td>
           ddd
           
          </td>
          <td><v-chip :color="item.estatus === 'Procesado' ? 'primary':'red' ">{{ item.estatus }}</v-chip>  </td>
       <td>
        <v-col cols="auto">
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
 
  {{compras}}
 
</template>
<script setup>
const compras = await useFetch(`http://127.0.0.1:8000/api/compras`);

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


</script>
