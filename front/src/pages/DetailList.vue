<template>
    <q-layout>
        <q-header elevated>
            <q-tabs indicator-color="transparent" class="text-grey" v-model="tab">
              <q-btn icon="left"
              flat
              @click="hasHistory()
              ? $router.go(-1)
              : $router.push('/')" class="my-5 btn btn-outline-success q-mr-auto">&laquo;
              </q-btn>
              <h5 class="q-mx-auto">{{ list[0]?.name }}</h5>
              <q-btn color="grey-7" round flat icon="more_vert" class="q-ml-auto">
                <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section @click=" dialogUpdate = true">Modifier</q-item-section>
                        <q-dialog v-model="dialogUpdate" persistent>
                            <q-card style="min-width: 350px">
                              <q-card-section>
                                <div class="text-h6">Modifier la liste</div>
                              </q-card-section>
                              <q-card-section class="q-pt-none">
                                <q-input dense v-model="name" autofocus @keyup.enter=" dialogUpdate = false" />
                              </q-card-section>
                              <q-card-actions align="right" class="text-primary">
                                <q-btn flat label="Cancel" v-close-popup />
                                <q-btn flat label="Modifier" @click="updateListSubmit" v-close-popup />
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
                                <q-btn flat label="Supprimer" @click="supList" v-close-popup />
                              </q-card-actions>
                            </q-card>
                          </q-dialog>
                      </q-item>
                    </q-list>
                  </q-menu>
              </q-btn>
          </q-tabs>
        </q-header>
        <q-footer bordered class="bg-white text-primary">
            <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey" v-model="tab">
              <q-btn flat round dense icon="add" @click="$router.push('/task/add/' + id)" class="q-mx-xl" />
            </q-tabs>
          </q-footer>
        <q-page-container v-if="tasksReactive.length > 0">
            <div>
                <div>
                    <q-item-label header>Tasks - {{countIsValid}}</q-item-label>
                    <div v-for="item in tasksReactive" :key="item._id">
                      <div v-if="!item.isValid">
                       <q-item tag="label" v-ripple>
                        <q-item-section side top>
                        <q-checkbox v-model="item.isValid" @click="updateIsValid(item._id, true)" />
                        </q-item-section>

                        <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        </q-item-section>
                        <q-btn color="grey-7" round flat icon="more_vert" >
                          <q-menu cover auto-close>
                              <q-list>
                                <q-item clickable>
                                  <q-item-section @click="$router.push('/task/' + item._id)">Détails</q-item-section>
                                </q-item>
                                <q-item clickable>
                                  <q-item-section @click="$router.push('/task/update/' + item._id)">Modifier</q-item-section>
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
                                          <q-btn flat @click="deleteTaskOnSubmit(item._id)" label="Supprimer" v-close-popup />
                                        </q-card-actions>
                                      </q-card>
                                    </q-dialog>
                                </q-item>
                              </q-list>
                            </q-menu>
                        </q-btn>
                    </q-item>
                  </div>
                </div>
              </div>
            </div>
            <q-separator spaced />
            <div>
                <div>
                    <q-item-label header>Tasks - {{countIsValid}}</q-item-label>
                    <div v-for="item in tasksReactive" :key="item._id">
                      <div v-if="item.isValid">
                       <q-item tag="label" v-ripple>
                        <q-item-section side top>
                        <q-checkbox v-model="item.isValid" @click="updateIsValid(item._id, false)"/>
                        </q-item-section>

                        <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        </q-item-section>
                        <q-btn color="grey-7" round flat icon="more_vert" >
                          <q-menu cover auto-close>
                              <q-list>
                                <q-item clickable>
                                  <q-item-section @click="$router.push('/task/' + item._id)">Détails</q-item-section>
                                </q-item>
                                <q-item clickable>
                                  <q-item-section @click="$router.push('/task/update/' + item._id)">Modifier</q-item-section>
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
                                          <q-btn flat label="Supprimer" @click="deleteTaskOnSubmit(item._id)" v-close-popup />
                                        </q-card-actions>
                                      </q-card>
                                    </q-dialog>
                                </q-item>
                              </q-list>
                            </q-menu>
                        </q-btn>
                    </q-item>
                  </div>
                </div>
            </div>
          </div>
        </q-page-container>
        <q-page-container v-else>
          <div>
            <div>
              <q-item-label header>Tasks - 0</q-item-label>
            </div>
            <q-separator spaced />
            <div>
              <q-item-label header>Tasks - 0</q-item-label>
            </div>
          </div>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { deleteListById, getList, updateListName } from 'src/services/lists'
import { getTasksList, deleteTask, updateTaskForm } from 'src/services/tasks'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const dialog = ref(false)
const dialogUpdate = ref(false)
const tasksReactive = ref([])
const countIsValid = ref(0)
const name = ref('')
const list = ref([])
const countIsNotValid = ref(0);

(async () => {
  const { data } = await getTasksList(id)
  const { data: dataList } = await getList(id)
  list.value = dataList
  name.value = dataList[0].name
  tasksReactive.value = data
  countIsValid.value = tasksReactive.value.filter(x => x.isValid).length
  countIsNotValid.value = tasksReactive.value.filter(x => !x.isValid).length
})()

async function deleteTaskOnSubmit (id) {
  const mutation = await deleteTask(id)
  if (mutation.status === 200) {
    location.reload()
  }
}

async function updateIsValid (id, bool) {
  const mutation = await updateTaskForm(id, { data: { isValid: bool } })
  if (mutation.status === 200) {
    location.reload()
  }
}

async function updateListSubmit () {
  const dataList = {
    id,
    name: name.value
  }
  const mutation = await updateListName(dataList)
  if (mutation.status === 200) {
    location.reload()
  }
}

async function supList () {
  const mutation = await deleteListById(id)
  if (mutation.status === 200) {
    location.href = '/#/'
  }
}

function hasHistory () { return window.history.length > 2 }

</script>
