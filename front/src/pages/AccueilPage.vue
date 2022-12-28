<template>
    <div>
        <h2>Bonjour, Tom Dupont!</h2>
      <q-card v-for="item in tasksReactive" :key="item._id" flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">{{item.name[0].toUpperCase() + item.name.slice(1)}}</div>
            </div>
            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item>
                      <q-item-section @click="dialogOnClick(item._id), dialogUpdate = true">Modifier</q-item-section>
                        <q-dialog v-model="dialogUpdate" persistent>
                          <q-card style="min-width: 350px">
                            <q-card-section>
                              <div class="text-h6">Modifier le nom de la liste</div>
                            </q-card-section>
                            <q-card-section class="q-pt-none" v-for="item in listData" :key="item._id">
                              <q-input dense v-model="item.name" autofocus @keyup.enter=" dialogUpdate = false" />
                            </q-card-section>
                            <q-card-actions align="right" class="text-primary">
                              <q-btn flat label="Cancel" v-close-popup />
                              <q-btn flat label="Modifier" @click="update" v-close-popup />
                            </q-card-actions>
                          </q-card>
                        </q-dialog>
                    </q-item>
                    <q-item clickable>
                      <q-item-section @click="dialogOnClick(item._id, 'delete'), dialog = true">Supprimer</q-item-section>
                      <q-dialog v-model="dialog" persistent>
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6">Supprimer la liste</div>
                          </q-card-section>
                          <q-card-section class="q-pt-none">
                            <p>Vous êtes sur le point de supprimer votre liste. Êtes vous sûr de vouloir faire ça ?</p>
                          </q-card-section>
                          <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Cancel" v-close-popup />
                            <q-btn flat label="Supprimer" @click="onSubmitDelete" v-close-popup />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section v-for="itemTask in item.tasks" :key="itemTask._id" class="cardSection">
          {{itemTask.name}}
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat @click="$router.push('/list/detail/' + item._id)" >voir la liste complète</q-btn>
        </q-card-actions>
      </q-card>
    </div>
</template>
<script setup>
import { getAllLists, updateList, getList, deleteList } from 'src/services/lists'
import { getTasksList } from 'src/services/tasks'
import { ref } from 'vue'

const tasksReactive = ref([])
const listData = ref([])
const dialog = ref(false)
const dialogUpdate = ref(false)
console.log(dialogUpdate);

(async () => {
  const { data } = await getAllLists()
  const reformData = await Promise.all(data.map(async x => {
    const { data: dataTask } = await getTasksList(x._id)
    console.log(dataTask)
    console.log(x)
    const newData = {
      ...x,
      tasks: dataTask
    }
    return newData
  }))
  console.log(reformData)
  tasksReactive.value = reformData
})()

async function dialogOnClick (id) {
  const { data } = await getList(id)
  console.log(data)
  listData.value = data
}

async function update () {
  const mutation = await updateList({ data: listData.value })
  if (mutation.status === 200) {
    location.reload()
  }
}

async function onSubmitDelete () {
  const mutation = await deleteList(listData.value)
  if (mutation.status === 200) {
    location.reload()
  }
}

console.log(tasksReactive.value)
</script>
<style lang="sass" scoped>
.my-card
  margin: 3%
  border-radius: 30px

.cardSection
  border-radius: 3px

</style>
