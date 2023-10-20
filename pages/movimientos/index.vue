<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title> Movimientos </v-toolbar-title>
      <template v-slot:append>
        <v-btn color="secondary" class="mb-2" v-bind="props" to="/movimientos/entrada"> ENTRADA </v-btn>
        <v-btn color="warning" class="mb-2" v-bind="props"> SALIDA </v-btn>
      </template>
    </v-toolbar>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Producto</th>
          <th class="text-left">Locacion</th>
          <th class="text-left">Cantidad</th>
          <th class="text-left">Tipo</th>
          <th class="text-left">Estatus</th>
          <th class="text-left">Accion</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in movimientos.data.value">
          <td>{{ item.producto.nombre }}</td>
          <td>{{ item.locacion.nombre }}</td>
          <td>{{ item.cantidad }}</td>
          <td>
            <v-chip class="ma-2"  v-if="item.tipo.tipo_base=='Entrada'" color="green" text-color="white">
               {{ item.tipo.nombre }}
            </v-chip>
            <v-chip class="ma-2" v-else color="red" text-color="white">
               {{ item.tipo.nombre }}
            </v-chip>
           
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
<pre>{{movimientos.data.value[0]}}</pre>
 
</template>
<script setup>
const movimientos = await useFetch(`http://127.0.0.1:8000/api/movimientos`);

const borrar = async (id) => {
  try {

    
    await useFetch(`http://127.0.0.1:8000/api/movimientos/${id}`, {
      method: "DELETE",
    });

    movimientos.data.value = movimientos.data.value.filter((nodo) => nodo.id !== id);
    console.log("intenta borrar", id);

  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};


</script>
