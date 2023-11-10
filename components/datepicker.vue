<template>
  <div class="text-center">

<input type="hidden"    v-model="value"   />
     
    <v-text-field
                    label="Fecha"
                    clearable
                    variant="outlined"
                    widht="90%"
                    @click="dialog2 = true"
                    v-model="formatted"
                    
                  
                  />
 

    <v-dialog v-model="dialog2" width="auto">
      <v-card>
        <v-card-text> 

        
          <v-date-picker hide-actions title="" v-model="date2"  >
            <template v-slot:header> </template>
          </v-date-picker>
        
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog2 = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  
 
</template>


<script setup>




 const props = defineProps(['modelValue']);
const emit = defineEmits();


import { VDatePicker } from "vuetify/labs/VDatePicker";
const dialog2 = ref(false);


const date2 = ref(new Date() )

 import { useDate } from 'vuetify/labs/date'
 //const date = useDate()
 const formatted = computed(()=>  `${date2.value.getFullYear()}/${date2.value.getMonth() + 1}/${date2.value.getDate()}`) 

 const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})


    watch(date2, (newValue) => {
 
      value.value =formatted.value
 
    });

</script>