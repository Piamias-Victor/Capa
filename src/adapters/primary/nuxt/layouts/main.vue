<template lang="pug">
.main-layout
  navbar.no-printme
  main
    slot
  pl-footer.mt-8
</template>

<style lang="scss" scoped>
main {
  @apply flex-grow;
}
.main-layout {
  @apply flex flex-col h-screen;
}
</style>
