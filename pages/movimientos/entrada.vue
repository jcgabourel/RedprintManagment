<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card title="Capurar entrada de productos">
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              
              <v-autocomplete
                :items="productos.data.value"
                item-title="nombre"
                item-value="id"
                label="Producto"
                v-model="forma['producto_id']"              
                variant="outlined"
              />

              <v-select
                :items="locaciones.data.value"
                item-title="nombre"
                item-value="id"
                label="Locacion"
                v-model="forma['locacion_id']"                
                variant="outlined"
               

              />
              <v-text-field
                
                label="Cantidad"
                clearable
                variant="outlined"
                v-model="forma['cantidad']"
                
              />

              <v-btn type="submit" block class="mt-2" color="primary"
                >Submit</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
  {{forma}}
</template>
<script setup>
const productos = await useFetch(`http://127.0.0.1:8000/api/productos/`);
const locaciones = await useFetch(`http://127.0.0.1:8000/api/locaciones/`);
const forma = reactive({stock_move_type_id:1})

const submitForm = async () => {
  const router = useRouter();
  if (JSON.stringify(forma.value) == "{}") return;
  try {
    let ruta = `http://127.0.0.1:8000/api/movimientos`;
    let metodo = "POST";
  
 

    const nuevo = await useFetch(ruta, {
      method: metodo,
      body: forma,
    });

    console.log(forma);
    
      router.push({ path: `/movimientos` });
     
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};
</script>
