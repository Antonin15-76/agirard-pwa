<template>
    <q-layout>
        <q-header elevated>
            <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey q-mx-sm" v-model="tab">
            <q-btn icon="left"
            flat
            @click="hasHistory()
            ? $router.go(-1)
            : $router.push('/')" class="my-5 btn btn-outline-success">&laquo;
          </q-btn>
          <q-btn flat dense icon="add" @click="$router.push('')" class="q-mx-xl" >Modifier</q-btn>
        </q-tabs>
        </q-header>
        <q-page-container>
            <h4>Modifier une tâche</h4>
            <div class="q-pa-md" style="max-width: 400px">

                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                  <q-input
                    filled
                    v-model="name"
                    label="Task *"
                    hint="Describe your task"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                    filled
                    v-model="describe"
                    label="Description *"
                    hint="Describe your task"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </div>
        </q-page-container>
    </q-layout>
</template>
<script >
import { ref } from 'vue'

export default {
  hasHistory () {
    return window.history.length > 2
  },
  setup () {
    const name = ref(null)
    const describe = ref(null)
    console.log(name)
    return {
      name,
      describe,

      onSubmit () {

      },

      onReset () {
        name.value = null
        describe.value = null
      }
    }
  }

}

</script>
