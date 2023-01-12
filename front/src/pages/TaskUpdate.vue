<template>
    <q-layout>
        <q-header elevated>
            <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey q-mx-sm tab" v-model="tab">
            <q-btn
            @click="hasHistory()
            ? $router.go(-1)
            : $router.push('/')" class="my-5 btn btn-outline-success">&lt;
          </q-btn>
        </q-tabs>
        </q-header>
        <q-page-container>
          <div style="padding: 0px 20px">
            <h4>Modifier une tâche</h4>
            <div class="q-pa-sm" style="max-width: 400px">
                <q-form
                  @submit="onSubmit"
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
                  <q-checkbox color="blue" v-model="isValid" autofocus @keyup.enter=" dialogUpdate = false"/>
                </q-form>
              </div>
          </div>

        </q-page-container>
        <q-footer>
          <div class="violet">
            <q-btn icon="left" type="submit" @click="onSubmit" class="center">Modifier</q-btn>
          </div>
        </q-footer>
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
<style lang="sass" scoped>
.center
  width: 100%
  background-color: #7F00FF

.violet
  padding: 10px 20px
  width: 100%
.tab
  height: 60px
</style>
