<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card :title="titulo">
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <div v-for="(header, index) in vheaders" :key="header.id">
                <v-text-field
                  v-if="contract.value[header] == 'string'"
                  :label="header"
                  clearable
                  variant="outlined"
                  v-model="forma[index]"
                />
                <v-autocomplete
                  v-if="contract.value[header] != 'string'"
                  :items="relaciones[header].map((item) => item)"
                  item-title="nombre"
                  item-value="id"
                  :label="header"
                  v-model="forma[index]"
                  @update:modelValue="
                    cambiaCategoria(forma[index], index, header)
                  "
                  variant="outlined"
                />
              </div>

              <v-btn type="submit" block class="mt-2" color="primary"
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
          <crear :modelo="modeloAlterno" :dontGoToList="true" @crearSubmited="crearSubmitedHandler"  />
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
const props = defineProps([
  "contract",
  "data",
  "modelo",
  "relaciones",
  "dontGoToList",
]);
const headers = Object.keys(props.contract.value);
const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const forma = reactive([]);
const dialog = ref(false);
const modeloAlterno = ref();
const indiceAlterno=ref();
const emit = defineEmits(['formaSubmited','finsubcaptura'])

function crearSubmitedHandler(cual,dequien){
dialog.value = false
emit('finsubcaptura')
forma[indiceAlterno.value]=cual
console.log("segun yo se seleccion ",cual," de",modeloAlterno.value)

}

const vheaders = computed(() => {
  return headers.filter((header) => header !== "id");
});

const campoforma = computed(() => {
  var resultado = {};

  if (forma.length === headers.length - 1) {
    for (var i = 0; i < forma.length; i++) {
      resultado[
        ["int", "string"].includes(props.contract.value[headers[i + 1]])
          ? headers[i + 1]
          : headers[i + 1] + "_id"
      ] = forma[i];
    }
  }
  return resultado;
});

const submitForm = async () => {
  const router = useRouter();
  console.log(JSON.stringify(campoforma.value));
  if (JSON.stringify(campoforma.value) == "{}") return;
  try {
    let ruta = `http://127.0.0.1:8000/api/${props.modelo}`;
    let metodo = "POST";

    if (props.data) {
      ruta += `/${props.data.id}`;
      metodo = "PUT";
    }

    const nuevo = await useFetch(ruta, {
      method: metodo,
      body: campoforma.value,
    });

    
   
     emit('formaSubmited',nuevo.data.value.id  )

    if (props.dontGoToList == undefined || props.dontGoToList == false) {
      router.push({ path: `/${props.modelo}` });
    }
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};

const cambiaCategoria = (valor, index, cual) => {
  if (valor == 0) {
    forma[index] = null;
    modeloAlterno.value = `${cual}s`;
indiceAlterno.value =index ;
    dialog.value = true;
  }
};

onMounted(()=>{
  for(const key in props.data)
  {
    if (key !="id")
    forma.push (props.data[key])
  }


})
</script>
