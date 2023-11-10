<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card>
          <v-toolbar density="compact">
            <v-toolbar-title> Compras </v-toolbar-title>

           
          </v-toolbar>

          

          <v-card-text >
            <v-form @submit.prevent="submitForm2">
              <datepicker v-model="forma['fecha']"> </datepicker>
              <v-select
                :items="claves['proveedores']"
                item-title="nombre"
                item-value="id"
                label="Proveedor"
                v-model="forma['proveedor_id']"
                variant="outlined"

                @update:modelValue=" cambiaCategoria(
                    forma['proveedor_id'],
                    'proveedor_id',
                    'proveedores'
                  ) "
              />

              <v-table>
                
                <tbody>
                  <tr v-for="(item, index) in movimientos"  >
                    <td>
                      <v-autocomplete
                        :items="claves['productos']"
                        item-title="nombre"
                        item-value="id"
                        v-model="item.producto_id"
                        density="compact"
                        hide-details="auto"
                        variant="plain"
                        placeholder="Producto"
                        
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
                    <td>
                      <v-text-field
                        label="Precio"
                        variant="plain"
                        hide-details="auto"
                        v-model="item.precio"
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

{{ forma }}
 -------------
{{ movimientosCompletos }}

 
</template>

<script setup>
import { VDatePicker } from "vuetify/labs/VDatePicker";

const productos = await useFetch(`http://127.0.0.1:8000/api/productos/`);
 

const proveedores = await useFetch(`http://127.0.0.1:8000/api/proveedores/`);
 
const forma = reactive({});
const movimientos = reactive([]);
const modeloAlterno = ref();
const dialog = ref(false);

const indiceAlterno = ref();

const claves = reactive({});

 const log =ref("")
const movimientosCompletos = computed(() => {
 
  return {
          ...forma,
          productos:{...movimientos}

        }
   
});

claves["productos"] = [
  ...productos.data.value
  //,  { id: 0, nombre: "Nuevo Producto.." },
];



claves["proveedores"] = [
  ...proveedores.data.value,
  { id: 0, nombre: "Nuevo Provedor.." },
];



const agregaProducto = () => {
  movimientos.push({ producto_id: null, cantidad: null ,precio:null});
};

 

const submitForm2 = async () => {
  const router = useRouter();

  if (movimientos.length == 0) return;
  try {
    let ruta = `http://127.0.0.1:8000/api/compras`;
    let metodo = "POST";

    const nuevo = await useFetch(ruta, {
      method: metodo,
      body: movimientosCompletos.value,
    });

    router.push({ path: `/compras` });
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

  const clavex = await useFetch(
    `http://127.0.0.1:8000/api/${modeloAlterno.value}/`
  );
  claves[modeloAlterno.value] = [
    ...clavex.data.value,
    { id: 0, nombre: `Nuevo ${indiceAlterno.value.slice(0, -3)}..` },
  ];
  log.value =`indiceAlterno.value = ${indiceAlterno.value } , ${indiceAlterno.value.slice(0, -3)}`
 

  forma[indiceAlterno.value] = cual;
}
</script>
