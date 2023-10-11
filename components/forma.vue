<template>
  <v-row no-gutters>
    <v-col cols="6" offset="3">
      <v-sheet class="pa-2 ma-2">
        <v-card :title="titulo">
          <v-card-text>
            <v-text-field :label="header"  clearable   variant="outlined" v-for="header in vheaders" :key="header.id"  v-model="data[header]"/> 
             
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
 const props =defineProps(['modelo','headers','data'])
 const titulo = props.modelo.charAt(0).toUpperCase() + props.modelo.slice(1);
 const vheaders =computed(() => {
  return props.headers.filter(header => header !== 'id');
});
  
 </script>
 