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
                  <q-checkbox v-model="isValid" autofocus @keyup.enter=" dialogUpdate = false"/>
                  <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
              </div>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { getTask, updateTaskForm } from 'src/services/tasks'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const tasksReactive = ref([])
const name = ref(null)
const describe = ref(null)
const listId = ref(null)
const isValid = ref(null);

(async () => {
  const { data } = await getTask(id)
  tasksReactive.value = data
  name.value = data[0].name
  describe.value = data[0].description
  isValid.value = data[0].isValid
  listId.value = data[0].listId
})()

function hasHistory () {
  return window.history.length > 2
}

async function onSubmit () {
  const data = {
    name: name.value,
    description: describe.value,
    isValid: isValid.value,
    listId: listId.value
  }

  const mutation = await updateTaskForm(id, { data })
  if (mutation.status === 200) {
    location.href = '/#/list/detail/' + data.listId
  }
}

</script>
