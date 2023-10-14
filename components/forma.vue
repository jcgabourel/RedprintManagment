<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card :title="titulo">
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                :label="header"
                clearable
                variant="outlined"
                v-for="(header, index) in vheaders"
                :key="header.id"
                v-model="forma[index]"
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
</template>

<script setup>
const props = defineProps(["modelo", "headers", "data"]);
const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const vheaders = computed(() => {
  return props.headers.filter((header) => header !== "id");
});

const forma = reactive([]);
const campoforma = computed(() => {
  var resultado = {};

  if (forma.length === props.headers.length - 1) {
    for (var i = 0; i < forma.length; i++) {
      resultado[props.headers[i + 1]] = forma[i];
    }
  }
  return resultado;
});

const submitForm = async () => {
  const router = useRouter();
  try {
    let ruta = "http://127.0.0.1:8000/api/categorias";
    let metodo = "POST";

    if (props.data) {
      ruta += `/${props.data.id}`;
      metodo = "PUT";
    }

    await useFetch(ruta, {
      method:metodo,
      body: campoforma.value,
    });

     router.push({ path: "/categorias" });
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
