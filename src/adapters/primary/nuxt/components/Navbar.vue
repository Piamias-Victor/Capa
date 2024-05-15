<template lang="pug">
.navbar.bg-base-100
  .navbar-start
    .dropdown
      label.btn.btn-ghost.btn-circle(tabindex='0')
        svg.h-5.w-5(xmlns='http://www.w3.org/2000/svg' fill='none' viewbox='0 0 24 24' stroke='currentColor')
          path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h7')
      ul.menu.menu-compact.dropdown-content.mt-3.p-2.shadow.bg-base-100.rounded-box.w-52(tabindex='0')
        li(v-for="(page, index) in leftMenu" :key="index")
          NuxtLink(:to="page.to" @click="onMenuSelected") {{ page.label }}
  .navbar-center
    a.btn.btn-ghost.normal-case.text-xl Pharlog Facing
  .navbar-end
    .dropdown.dropdown-end
      label.btn.btn-ghost(tabindex='0') demo@pharlog.fr
      ul.mt-3.p-2.shadow.menu.menu-compact.dropdown-content.bg-base-100.rounded-box.w-52(tabindex='0')
        li
          a.justify-between
            | Profile
            span.badge New
        li
          a Settings
        li
          a Logout
</template>

<script lang="ts" setup>
const leftMenu = [
  {
    label: 'Historique',
    to: '/'
  },
  {
    label: 'Nouveau facing',
    to: '/new'
  }
]

const onMenuSelected = () => {
  document.activeElement.blur()
}

</script>
