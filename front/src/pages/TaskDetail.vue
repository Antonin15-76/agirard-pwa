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
                  <q-item clickable @click="prompt = true">
                    <q-item-section>Déplacer</q-item-section>
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
                                  <q-select
                                    filled
                                    autofocus @keyup.enter="prompt = false"
                                    v-model="list"
                                    :options="options"
                                    label="Standard"
                                    emit-value
                                    map-options
                                  />
                                </div>
                              </div>
                            <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
                          </q-card-section>
                          <q-card-actions align="right" class="text-primary">
                            <q-btn flat label="Cancel" v-close-popup />
                            <q-btn flat label="Déplacer" v-close-popup />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="dialogSup = true">Supprimer</q-item-section>
                    <q-dialog v-model="dialogSup" persistent>
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
        <q-page-container>
            <p>fdds</p>
            <h5>fd fd</h5>
            <p>dfd </p>
            <h6>fdd</h6>
            <p>yyrty</p>
            <h6> tret t r</h6>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from 'vue'

const prompt = ref(false)
const dialog = ref(false)
const dialogUpdate = ref(false)
const list = ref('')
const options = [
  {
    label: 'Google',
    value: 'goog'
  },
  {
    label: 'Facebook',
    value: 'fb'
  },
  {
    label: 'Twitter',
    value: 'twt'
  }
]
console.log(prompt)
function hasHistory () { return window.history.length > 2 }

</script>
