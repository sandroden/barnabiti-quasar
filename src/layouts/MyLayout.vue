<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-primary" dark>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title class="text-weight-medium text-h4">
          Corpus dei disegni Chierici Regolari di san Paolo
          <br />
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar
        class="q-mt-none q-pt-none bg-secondary text-primary justify-end"
      >
        <q-btn flat dense class="invisible">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title class="text-weight-medium text-h5">
          Chierici Regolari di San Paolo
        </q-toolbar-title>
        <q-list class="row" id="toolbar-buttons">
          <div id="searchInput"></div>
          <q-item to="/">Home </q-item>
          <q-item to="/guida">Guida </q-item>
          <q-item to="/contatti">Contatti </q-item>
        </q-list>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-primary"
      content-class="bg-primary text-white"
    >
      <!-- <router-link to="/">
        <q-img src="/logo-sforza.jpg" q-ma-none q-pa-none> </q-img>
      </router-link> -->
      <q-list text-white class="column">
        <q-item to="/disegni">
          <q-item-section>
            <q-item-label>Catalogo dei disegni</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/autori">
          <q-item-section>
            <q-item-label>Autori</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/archivi">
          <q-item-section>
            <q-item-label>Archivi e Collezioni</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/collegi">
          <q-item-section>
            <q-item-label>Collegi</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/cerca">
          <q-item-section>
            <q-item-label>Cerca</q-item-label>
          </q-item-section>
        </q-item>
        <q-space></q-space>
      </q-list>
      <q-img
        src="logo_polimi_outline.png"
        class="sponsor q-ma-none q-pa-none"
        width="320px"
        native-context-menu
      >
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-secondary">
      <q-toolbar class="q-py-none toolbar__footer">
        <q-toolbar-title class="text-primary text-subtitle2 text-weight-light">
          Corpus dei disegni Chierici Regolari di san Paolo
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const leftDrawerOpen = ref($q.platform.is.desktop)
</script>

<style lang="sass" scoped>
.toolbar__footer
   min-height: 40px

>>> .q-drawer-container .q-item__section > .q-item__label
   text-transform: uppercase
   color: #7C3D0F
.q-item__section
    color: #7C3D0F

img
  width: 50%

.q-drawer a.q-router-link--exact-active .q-item__label
    color: $secondary
    font-weight: bold

.contributo
  font-size: 98%

#toolbar-buttons
  padding-top: 10px

.q-toolbar
   height: 70px
</style>
>
