<template>
 <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card title="Productos">
          <v-card-text>
            <v-text-field label="Nombre" variant="outlined"></v-text-field>
            <v-select
              label="Categoria"
              :items="listacategorias"
              variant="outlined"
              @update:modelValue="cambiaCategoria"
            ></v-select>
            <v-select
              label="Marcas"
              :items="marcas"
              variant="outlined"
            ></v-select>
            <v-btn type="submit" block class="mt-2" color="primary"
              >Submit</v-btn
            >
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>

  <div class="text-center">
     

      <v-dialog v-model="dialog" persistent   width="1024">
        <v-card>
          <v-card-text> 
           <edit modelo="categorias" />
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

 import edit from "~/components/catalogos/edit.vue";


  const dialog = ref(false);

  const dato = await useFetch("/api/categorias");
  let listacategorias = dato.data.value.map((item) => item.nombre);

  listacategorias.push("Nueva Categoria..");

  const dato2 = await useFetch("/api/marcas");
  let marcas = dato2.data.value.map((item) => item.nombre);

  const cambiaCategoria = (valor) => {
    if (valor == "Nueva Categoria..")
      dialog.value= true
  };
 </script>
