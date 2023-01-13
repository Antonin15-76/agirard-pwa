<template>
  <q-layout>
    <q-header elevated>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Déplacer la tâche dans une liste</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="q-pa-md" style="max-width: 300px">
              <div class="q-gutter-md">
                <q-badge color="secondary" multi-line>
                  Sélectionner la liste: "{{ model }}"
                </q-badge>
                <q-select filled autofocus @keyup.enter="prompt = false" v-model="list" :options=options
                  label="Standard" emit-value map-options />
              </div>
            </div>
            <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat color="black" label="Cancel" v-close-popup />
            <q-btn class="violet2" label="Déplacer" @click="move" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogSup" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Supprimer la liste</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p>Vous êtes sur le point de supprimer votre liste. Êtes vous sûr de vouloir faire ça ?</p>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat color="black" label="Cancel" v-close-popup />
            <q-btn color="red" label="Supprimer" v-close-popup @click="deleteTaskSubmit" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey q-mx-sm tab" v-model="tab">
        <q-btn
        @click="hasHistory()
          ? $router.go(-1)
          : $router.push('/')"
          class="my-5 btn btn-outline-success">&lt;
        </q-btn>
        <q-btn color="grey-7" round flat icon="more_vert" class="paddingLeft">
          <q-menu cover auto-close>
            <q-list>
              <q-item v-for="item in tasksReactive" :key="item._id" clickable>
                <q-item-section @click="$router.push('/task/update/' + item._id)">Modifier</q-item-section>
              </q-item>
              <q-item clickable @click="prompt = true">
                <q-item-section>Déplacer</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section @click="dialogSup = true">Supprimer</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-tabs>
    </q-header>
    <q-page-container v-for="item in tasksReactive" :key="item._id">
      <div class="wrap">
        <p>Task</p>
        <h4>{{ item.name }}</h4>
        <p>Description </p>
        <h5>{{ item.description }}</h5>
        <p>Terminé</p>
        <h5 v-if="item.isValid">Oui</h5>
        <h5 v-else>Non</h5>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { getAllLists } from 'src/services/lists'
import { deleteTask, getTask, moveInOtherList } from 'src/services/tasks'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const prompt = ref(false)
const dialogSup = ref(false)
const route = useRoute()
const id = route.params.id
const list = ref('')
const tasksReactive = ref([])
const lists = ref([])
const options = ref([]);

(async () => {
  const { data: dataLists } = await getAllLists()
  const { data } = await getTask(id)

  tasksReactive.value = data
  lists.value = dataLists
  options.value = dataLists.map(x => {
    return {
      label: x.name,
      value: x._id
    }
  })
})()

async function move () {
  return await moveInOtherList(id, { listId: list.value })
}

async function deleteTaskSubmit () {
  const mutation = await deleteTask(id)
  if (mutation.status === 200) {
    location.href = '/#/list/detail/' + tasksReactive.value[0].listId
  }
}

function hasHistory () { return window.history.length > 2 }

</script>
<style lang="sass" scoped>
.wrap
  padding: 20px

.violet
  padding: 10px 20px
  width: 100%
.tab
  height: 60px

.paddingLeft
  padding-left: 82%

.violet2
  background-color: #7F00FF

</style>
