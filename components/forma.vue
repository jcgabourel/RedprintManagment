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
                <v-select
                  v-if="contract.value[header] != 'string'"
                  :items="otherdata[header].map((item) => item)"
                  item-title="nombre"
                  item-value="id"
                  :label="header"
                  v-model="forma[index]"
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
</template>

<script setup>
const props = defineProps(["contract", "data", "modelo", "otherdata"]);
const headers = Object.keys(props.contract.value);

const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const forma = reactive([]);

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

    await useFetch(ruta, {
      method: metodo,
      body: campoforma.value,
    });

    router.push({ path: `/${props.modelo}` });
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};

onMounted(() => {
  for (let dato in props.data) {
    if (dato != "id") forma.push(props.data[dato]);
  }
});
</script>
