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
          <h5 class="q-mx-sm">List name</h5>
          <q-btn color="grey-7" round flat icon="more_vert" >
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
        </q-tabs>
        </q-header>
        <q-footer bordered class="bg-white text-primary">
            <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey" v-model="tab">
              <q-btn flat round dense icon="add" @click="$router.push('/task/add')" class="q-mx-xl" />
            </q-tabs>
          </q-footer>
        <q-page-container  >
            <div v-for="item in tasksReactive" :key="item._id">
                <div v-if="!item.isvalid">
                    <q-item-label header>Tasks - {{countIsNotValid}}</q-item-label>

                    <q-item tag="label" v-ripple>
                        <q-item-section side top>
                        <q-checkbox v-model="item.isValid" />
                        </q-item-section>

                        <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </div>
                <div v-else>
                    <q-item-label header>Tasks - 0</q-item-label>
                </div>
            </div>
            <q-separator spaced />
            <div v-for="item in tasksReactive" :key="item._id">
                <div v-if="item.isvalid">
                    <q-item-label header>Tasks - {{countIsValid}}</q-item-label>
                    <q-item tag="label" v-ripple>
                        <q-item-section side top>
                        <q-checkbox v-model="item.isValid" />
                        </q-item-section>

                        <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </div>
                <div v-else>
                    <q-item-label header>Tasks - 0</q-item-label>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { getTasksList } from 'src/services/tasks'
import { ref } from 'vue'

const dialog = ref(false)
const dialogUpdate = ref(false)
const tasksReactive = ref([])

const countIsValid = tasksReactive.value.filter(x => x.isValid).length
const countIsNotValid = tasksReactive.value.filter(x => !x.isValid).length;

(async () => {
  const uri = window.location.href.split('/')
  console.log(uri[uri.length - 1])
  const { data } = await getTasksList(uri[uri.length - 1])
  console.log(data)
  tasksReactive.value = data
})()

function hasHistory () { return window.history.length > 2 }

</script>
