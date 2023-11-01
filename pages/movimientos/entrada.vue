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
                :items="claves['productos'] "
                item-title="nombre"
                item-value="id"
                label="Producto"
                v-model="forma['producto_id']"
                variant="outlined"
                @update:modelValue=" cambiaCategoria(
                    forma['producto_id'],
                    'producto_id',
                    'productos'
                  ) "
              />

              <v-select
                :items="claves['locacion']"
                item-title="nombre"
                item-value="id"
                label="Locacion"
                v-model="forma['locacion_id']"
                variant="outlined"
                @update:modelValue=" cambiaCategoria(
                    forma['locacion_id'],
                    'locacion_id',
                    'locaciones'
                  ) "
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

  <div class="text-center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-text>
          <crear
            :modelo="modeloAlterno"
            :dontGoToList="true"
            @crearSubmited="crearSubmitedHandler"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">
            Close Dialog
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const productos = await useFetch(`http://127.0.0.1:8000/api/productos/`);
const locaciones = await useFetch(`http://127.0.0.1:8000/api/locaciones/`);
const tipos = await useFetch(`http://127.0.0.1:8000/api/tiposmovimiento/`);

const capturaMasiva = ref(false);
const forma = reactive({ stock_move_type_id: 1 });
const movimientos = reactive([]);
const modeloAlterno = ref();
const dialog = ref(false);
const indiceAlterno = ref();


const claves = reactive({});

// const clavesProductos = reactive({});
// const clavesLocaciones = reactive({});

const movimientosCompletos = computed(() => {
  return movimientos.map((movimiento) => {
    movimiento.stock_move_type_id = forma["stock_move_type_id"];
    movimiento.locacion_id = forma["locacion_id"];
    return movimiento;
  });
});



claves['productos']= [
  ...productos.data.value,
  { id: 0, nombre: "Nuevo Producto.." },
];
claves['locacion']= [
  ...locaciones.data.value,
  { id: 0, nombre: "Nueva Locacion.." },
];

// clavesProductos.value = [
//   ...productos.data.value,
//   { id: 0, nombre: "Nuevo Producto.." },
// ];
// clavesLocaciones.value = [
//   ...locaciones.data.value,
//   { id: 0, nombre: "Nueva Locación.." },
// ];




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

const submitForm2 = async () => {
  const router = useRouter();

  if (movimientos.length == 0) return;
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

const borrar = (indice) => {
  if (indice >= 0 && indice < movimientos.length) {
    movimientos.splice(indice, 1);
  }
};

const cambiaCategoria = (valor, index, cual) => {
  if (valor == 0) {
    forma[index] = null;

    modeloAlterno.value = cual;
    indiceAlterno.value = index;
    dialog.value = true;
  }
};

async function crearSubmitedHandler(cual) {
  dialog.value = false;
  
  const clavex = await useFetch(`http://127.0.0.1:8000/api/${modeloAlterno.value}/`);
  claves[indiceAlterno.value.slice(0, -3)] = [
    ...clavex.data.value,
    { id: 0, nombre: `Nuevo ${indiceAlterno.value.slice(0, -3)}..` },
  ];
  
  // const locacionesx = await useFetch(`http://127.0.0.1:8000/api/locaciones/`);
  // clavesLocaciones.value = [
  //   ...locacionesx.data.value,
  //   { id: 0, nombre: "Nueva Locación.." },
  // ];

  forma[indiceAlterno.value] = cual;

  
}
</script>
