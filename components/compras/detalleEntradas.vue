<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Fecha</th>
          <th class="text-left">Folio</th>
          <th class="text-left">Producto</th>
          <th class="text-left">Locacion</th>
          <th class="text-left">Cantidad</th>                   
          <th class="text-left">Asignar</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in movimientos.data.value">
            <td>Fecha</td>
            <td>Folio</td>
          <td>{{ item.producto.nombre }}</td>
          <td>{{ item.locacion.nombre }}</td>
          <td>{{ item.cantidad }}</td>          
          
       <td>
        <v-col cols="auto">
            <v-text-field                
                clearable
                variant="outlined"                
              />
              </v-col>
       </td>
       </tr>
      </tbody>
    </v-table> 
</template>

<script setup>
    const movimientos = await useFetch(`http://127.0.0.1:8000/api/movimientos`);    
</script>