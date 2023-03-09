<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="sass">
p, h1, h2, h3, h4, h5
  color: $grey-9
  font-size: 1rem

h1
  font-size: 1.6rem
  font-weight: bold

img
  height: intrinsic

.q-expansion-item .q-item-label
  font-weight: bold

.q-expansion-item--expanded
  border: 1px solid $grey-5

  .q-focusable
    background-color: $primary

  // non funziona!
  .q-expansion-item__content
    padding: 0 15px
    color: red

.constrained-page
  justify-content: center
  & > div
    width: 85%
    max-width: 1000px

  @media (max-width: 600px)
    & > div
      width: 100%
      max-width: 100vw

  a
    color: brown
    text-decoration: none
    font-weight: 600
    &:hover
      color: $primary
    &:visited
      color: $primary
</style>
