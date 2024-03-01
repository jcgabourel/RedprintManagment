<template>
  <div>
    <v-container>
      <v-row>
        <!-- Columna izquierda -->
        <v-col cols="6">
          <v-row>
            <v-col cols="12">
              <strong>Fecha:</strong> {{ detalle_compra[0].fecha }}
            </v-col>
            <v-col cols="12">
              <strong>Proveedor:</strong>
              {{ detalle_compra[0].proveedor.nombre }}
            </v-col>
            <v-col cols="12">
              <strong>Producto:</strong>
              {{ detalle_compra[0].registro.producto.nombre }}
            </v-col>
            <v-col cols="12">
              <strong>Precio:</strong> {{ detalle_compra[0].registro.precio }}
            </v-col>
          </v-row>
        </v-col>

        <!-- Columna derecha -->
        <v-col cols="6">
          <v-row>
            <v-col cols="12">
              <strong>Cantidad:</strong>
              {{ detalle_compra[0].registro.cantidad }}
            </v-col>
            <v-col cols="12">
              <strong>Sin ingresar:</strong>
              {{ detalle_compra[0].registro.cantidad }}
            </v-col>
            <v-col cols="12">
              <strong>Ingresados:</strong>
              <span :class="{ 'red-text': totalCantidad > 20 }">
                {{ totalCantidad }}</span
              >
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
          <td>{{ item.fecha }}</td>

          <td>{{ item.producto.nombre }}</td>
          <td>{{ item.locacion.nombre }}</td>
          <td>{{ item.cantidad }}</td>

          <td>
            <v-col cols="auto">
              <v-text-field
                type="number"
                :max="item.cantidad"
                min="0"
                step="1"
                clearable
                variant="outlined"
                @input="validateInteger($event)"
                @paste="handlePaste($event)"
                v-model="cantidadArray[index]"
              />
            </v-col>
          </td>
        </tr>
      </tbody>
    </v-table>

    {{ cantidadArray }}
  </div>
</template>

<script setup>
const props = defineProps(["detalle_compra"]);
const movimientos = await useFetch(`http://127.0.0.1:8000/api/movimientos`);
const validateInteger = (event) => {
  const inputValue = parseInt(event.target.value) || 0;
  const maxValue = parseInt(event.target.max) || Infinity;
  const minValue = parseInt(event.target.min) || -Infinity;
  // Verificar si el valor excede el límite máximo
  if (inputValue > maxValue) {
      event.target.value = maxValue;
      return;
    }

    // Verificar si el valor es menor que el mínimo
    if (inputValue < minValue) {
      event.target.value = minValue;
      return;
    }
    
  // Expresión regular para verificar si el valor es un número entero
  if (!/^\d+$/.test(inputValue)) {
    // Si no es un número entero, ajusta el valor del campo
    event.target.value = Math.floor(inputValue);
  }
};

const handlePaste = (event) => {
  // Evita que se ejecute la acción de pegado predeterminada
  event.preventDefault();
  // Obtiene el texto que se está pegando
  const pastedText = event.clipboardData.getData("text");
  // Filtra solo los caracteres que son números
  const integerText = pastedText.replace(/\D/g, "");
  // Actualiza el valor del campo con el texto filtrado
  document.execCommand("insertText", false, integerText);
};

const cantidadArray = reactive([]);

const totalCantidad = computed(() => {
  const filteredArray = cantidadArray.filter((val) => val !== ""); // Filtrar cadenas vacías
  return filteredArray.reduce((acc, curr) => acc + parseFloat(curr || 0), 0); // Convertir a 0 si es una cadena vacía
});
</script>

<style scoped>
.red-text {
  color: red;
}
</style>
