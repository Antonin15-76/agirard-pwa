<template>
    <div>
        <h2>Bonjour, Tom Dupont!</h2>
        {{tasksReactive}}
  <q-card flat bordered class="my-card bg-grey-1">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">Ecole</div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Détails</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Modifier</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Supprimer</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      {{ lorem }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat >voir la liste complète</q-btn>
    </q-card-actions>
  </q-card>
    </div>
</template>
<script setup>
import { getAllTasks } from 'src/services/tasks'
import { ref } from 'vue'

const tasksReactive = ref([]);

(async () => {
  const { data } = await getAllTasks()
  tasksReactive.value = data
})()
console.log(tasksReactive)
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  margin: 30px
</style>
