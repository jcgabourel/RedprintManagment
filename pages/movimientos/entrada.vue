<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card>
          <v-toolbar density="compact">
            <v-toolbar-title> Capurar entrada de productos </v-toolbar-title>

            <template v-slot:append>
              <div>
                &nbsp;<v-switch
                  class="pa-2 ma-2"
                  v-model="capturaMasiva"
                  label="Captura Masiva"
                ></v-switch>
              </div>
            </template>
          </v-toolbar>

          <v-card-text v-if="!capturaMasiva">
            <v-form @submit.prevent="submitForm">
              <v-select
                :items="tipos.data.value"
                item-title="nombre"
                item-value="id"
                label="Tipo"
                v-model="forma['stock_move_type_id']"
                variant="outlined"
              />

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

          <v-card-text v-if="capturaMasiva">
            <v-form @submit.prevent="submitForm2">
              <v-select
                :items="tipos.data.value"
                item-title="nombre"
                item-value="id"
                label="Tipo"
                v-model="forma['stock_move_type_id']"
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

              <v-table>
                <!-- <thead>
                  <tr>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Cantidad</th>
                  </tr>
                </thead> -->
                <tbody>
                  <tr v-for="(item, index) in movimientos">
                    <td>
                      <v-autocomplete
                        :items="productos.data.value"
                        item-title="nombre"
                        item-value="id"
                        v-model="item.producto_id"
                        density="compact"
                        hide-details="auto"
                        variant="plain"
                      />
                    </td>
                    <td>
                      <v-text-field
                        label="Cantidad"
                        variant="plain"
                        hide-details="auto"
                        v-model="item.cantidad"
                      />
                    </td>
                    <td width="10%">
                      <v-col cols="auto">
                        <v-btn
                          density="compact"
                          icon="mdi-delete"
                          @click="borrar(index)"
                        />
                      </v-col>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <v-btn block class="mt-2" @click="agregaProducto"
                >Agregar Producto</v-btn
              >

              <v-btn type="submit " block class="mt-2" color="primary"
                >Submit</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>

   
  {{movimientos}}
</template>
<script setup>
const productos = await useFetch(`http://127.0.0.1:8000/api/productos/`);
const locaciones = await useFetch(`http://127.0.0.1:8000/api/locaciones/`);
const tipos = await useFetch(`http://127.0.0.1:8000/api/tiposmovimiento/`);
const capturaMasiva = ref(false);

const forma = reactive({ stock_move_type_id: 1 });

const movimientos = reactive([]);

const agregaProducto = () => {
  movimientos.push({ producto_id: null, cantidad: null });
};

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



const movimientosCompletos = computed(()=>{

 return  movimientos.map((movimiento)=>{
    movimiento.stock_move_type_id=forma['stock_move_type_id']
    movimiento.locacion_id=forma['locacion_id']
    return movimiento

  })
})

const submitForm2 = async () => {
  const router = useRouter();

 
  if (movimientos.length ==0) return;
  try {
 
 

 

    let ruta = `http://127.0.0.1:8000/api/movimientos/batch`;
    let metodo = "POST";

    const nuevo = await useFetch(ruta, {
      method: metodo,
      body: movimientosCompletos.value,
    });

 

    router.push({ path: `/movimientos` });
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};

const borrar =   (indice) => {

console.log( movimientos.length);
    if (indice >= 0 && indice < movimientos.length) {
      movimientos.splice(indice, 1);
    }  
};


</script>
