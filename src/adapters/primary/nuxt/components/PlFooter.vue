<template lang="pug">
footer.footer.footer-center.p-4.bg-base-300.text-base-content
  div
    p &copy; {{ year }} {{ siteName }}
</template>

<script lang="ts" setup>
import { year, siteName } from '~/metadata'
</script>
