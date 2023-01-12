<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar>
        <q-toolbar-title>
          Dashboard
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          class="circleButton"
          icon="person"
          aria-label="Profil"
        />
      </q-toolbar>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-drawer
      v-model="leftMenuOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Mes listes
        </q-item-label>

        <div class="size">
          <q-btn icon="left" type="submit" @click="add = true" class="center">Créer une liste</q-btn>
        </div>

        <EssentialLink
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey tab" v-model="tab">
        <q-btn flat round dense icon="menu" @click="toggleLeftMenu" class="q-mx-xl" />
        <q-btn round dense icon="add" class="q-mx-xl violet"  @click="add = true" />
        <q-btn flat round dense icon="person" class="q-mx-xl" />
      </q-tabs>
      <q-dialog v-model="add" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Créer une nouvelle liste</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input aria-placeholder="Ex=Courses" dense v-model="nameList" autofocus @keyup.enter=" add = false" />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat color="black" label="Cancel" v-close-popup />
            <q-btn flat class="violet" label="Créer" @click="onSubmit" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { createList, getAllLists } from 'app/src/services/lists'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const leftMenuOpen = ref(false)
    const nameList = ref([])
    const arrayLinks = ref([]);

    (async () => {
      const { data } = await getAllLists()

      arrayLinks.value = data.map(x => ({
        title: x.name,
        icon: 'list',
        link: 'http://localhost:9000/#/list/detail/' + x._id
      }))
    })()
    return {
      add: ref(false),
      nameList,
      address: ref(''),
      essentialLinks: linksList,
      menuLinks: arrayLinks,
      leftDrawerOpen,
      leftMenuOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleLeftMenu () {
        leftMenuOpen.value = !leftMenuOpen.value
      },
      async onSubmit () {
        const mutation = await createList({ data: nameList.value })
        if (mutation.status === 200) {
          location.reload()
        }
      }
    }
  }
})
</script>
<style lang="sass" scoped>
.circleButton
  border-radius: 35px
  border: solid 0.5px

.tab
  height: 50px

.violet
  background-color: #7F00FF

.center
  width: 100%
  background-color: #7F00FF

.size
  padding: 10px 20px
  width: 100%

</style>
