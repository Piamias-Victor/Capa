<template lang="pug">
.grid-table
  div.grid.grid-cols-4.flex.items-center.justify-center
    div(
      v-for="(header, index) in headers" :key="`header-${index}`"
    )
      div.header {{ $t(`table.${name}.${header}`) }}
  div.grid.grid-cols-4.flex.items-center.justify-center(
    v-for="(d, index) in data" :key="index"
  )
    div(
      v-for="(key, slotIndex) in headers" :key="slotIndex"
    )
      slot(:name="key" :value="data[index][key]")
        .text {{ data[index][key] }}
</template>

<script lang="ts" setup>
import { computed } from '#imports'
const props = defineProps({
  data: { type: Array, required: true },
  name: { type: String, required: true }
})

const headers = computed(() => {
  const localData = JSON.parse(JSON.stringify(props.data))
  const item = localData[0]
  if (!item) return []
  return Object.keys(item)
})

</script>

<style lang="scss" scoped>
  .header {
    text-transform: uppercase;
    font-size: 13px;
    @apply border-b-2 border-black;
  }
  .text {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
