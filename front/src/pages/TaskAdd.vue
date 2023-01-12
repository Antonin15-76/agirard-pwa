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
            <h4>Créer une tâche</h4>
            <div class="q-pa-sm" style="max-width: 400px">
                <q-form
                  @submit="onSubmit"
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
                </q-form>
              </div>
            </div>
        </q-page-container>
        <q-footer>
          <div class="violet">
            <q-btn icon="left" type="submit" @click="onSubmit" class="center">Créer</q-btn>
          </div>
        </q-footer>
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
