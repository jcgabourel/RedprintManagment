<template>


 <div>

  <v-container>
    <v-row>
      <!-- Columna izquierda -->
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <strong>Fecha:</strong>   compra.fecha  
          </v-col>
          <v-col cols="12">
            <strong>Proveedor:</strong>   compra.proveedor  
          </v-col>
          <v-col cols="12">
            <strong>Producto:</strong>   compra.producto  
          </v-col>
          <v-col cols="12">
            <strong>Precio:</strong>   compra.precio  
          </v-col>
        </v-row>
      </v-col>
      
      <!-- Columna derecha -->
      <v-col cols="6">
        <v-row>
         
          <v-col cols="12">
            <strong>Cantidad:</strong>   compra.cantidad  
          </v-col>
          <!-- Puedes añadir más campos si es necesario -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-table>
      <thead>
        <tr>
          <th class="text-left">Fecha</th>
         
          <th class="text-left">Producto</th>
          <th class="text-left">Locacion</th>
          <th class="text-left">Cantidad</th>                   
          <th class="text-left">Asignar</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in movimientos.data.value">
             
            <td>{{item.fecha}}</td>
            
          <td>{{ item.producto.nombre }}</td>
          <td>{{ item.locacion.nombre }}</td>
          <td>{{ item.cantidad }}</td>          
          
       <td>
        <v-col cols="auto">
            <v-text-field   
                type="number"
                :max="item.cantidad"             
                min=0
                step="1"
                clearable
                variant="outlined"                
              />
              </v-col>
       </td>
       </tr>
      </tbody>
    </v-table> 


----------
    {{ detalle_compra }}
--------

 </div>   





</template>

<script setup>
    const props = defineProps(["detalle_compra"]);
    const movimientos = await useFetch(`http://127.0.0.1:8000/api/movimientos`);    
</script>