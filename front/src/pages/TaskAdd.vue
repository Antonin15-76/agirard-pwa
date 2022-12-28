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
          <q-btn
          flat
          @click="hasHistory()
          ? $router.go(-1)
          : $router.push('/')" class="my-5 btn btn-outline-success">&laquo;
          Annuler
        </q-btn>        </q-tabs>
        </q-header>
        <q-page-container>
            <h4>Créer une tâche</h4>
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
                    <q-btn label="Submit" type="submit"  color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </div>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from 'vue'
import { createTask } from 'app/src/services/tasks'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const name = ref(null)
const describe = ref(null)

function hasHistory () {
  return window.history.length > 2
}

async function onSubmit () {
  const data = {
    name: name.value,
    description: describe.value,
    isValid: false,
    listId: id
  }
  const mutation = await createTask(data)
  if (mutation.status === 200) {
    location.href = '/#/list/detail/' + id
  }
}

</script>
