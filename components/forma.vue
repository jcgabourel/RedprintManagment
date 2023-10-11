<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card :title="titulo">
          <v-card-text>
            <v-text-field label="Nombre" variant="outlined"></v-text-field>
             
            <v-btn type="submit" block class="mt-2" color="primary"
              >Submit</v-btn
            >
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
 const props =defineProps(['modelo'])
 const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
  
 </script>
 