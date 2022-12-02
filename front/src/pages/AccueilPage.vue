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
                    <q-item clickable>
                      <q-item-section @click=" dialogUpdate = true">Modifier</q-item-section>
                      <q-dialog v-model="dialogUpdate" persistent>
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6">Modifier une nouvelle liste</div>
                          </q-card-section>
                          <q-card-section class="q-pt-none">
                            <q-input dense v-model="address" autofocus @keyup.enter=" dialogUpdate = false" />
                          </q-card-section>
                          <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Cancel" v-close-popup />
                            <q-btn flat label="Créer" v-close-popup />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                    </q-item>
                    <q-item clickable>
                      <q-item-section @click="dialog = true">Supprimer</q-item-section>
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
                            <q-btn flat label="Supprimer" v-close-popup />
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
        <q-card-section v-for="itemTask in item.tasks" :key="itemTask._id">
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
import { getAllLists } from 'src/services/lists'
import { getTasksList } from 'src/services/tasks'
import { ref } from 'vue'

const tasksReactive = ref([])
const dialog = ref(false)
const dialogUpdate = ref(false);

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

console.log(tasksReactive.value)
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  margin: 30px
</style>
