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
                v-model="forma[index+1]"
              />

              <v-btn type="submit" block class="mt-2" color="primary"
                >Submit</v-btn
              >


              <input type="text" name="uuid"   v-model="forma[0]" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
 
</template>

<script setup> 

const props = defineProps(["modelo", "headers", "data","uuid"]);
const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
const vheaders = computed(() => {
  return props.headers.filter((header) => header !== "id");
});

const forma = reactive([]);
const campoforma = computed(() => {
  var resultado = {};

  if (forma.length === props.headers.length) {
    for (var i = 0; i < forma.length; i++) {
      resultado[props.headers[i]] = forma[i];
    }
  }
  return resultado;
});

const submitForm = () => {
  try {

    forma[0] = props.uuid

    console.log(forma)
    useFetch("http://localhost:3001/api/categorias/store", {
      method: "POST",
      body: campoforma.value,
    });

    const router = useRouter();
    router.push({ path: "/categorias" });


    console.log("Respuesta del servidor:", props.data);
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};


 


</script>
 