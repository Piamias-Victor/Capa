<template lang="pug">
.facing-filters
  text-input(
    :placeholder="$t('filters.search.placeholder')"
    @changed="searchChanged"
  )
  div
    .form-control(
      v-for="key in facingResultsAvailable()" :key="key"
    )
      check-box(
        :label ="$t(`facingStatus.${key}`)"
        @changed="checkChanged(key)"
      )
</template>

<script lang="ts" setup>
import { ref } from '#imports'
import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'

defineProps({
  label: { type: String }
})

const emit = defineEmits<{
  (e: 'changed', filters: any): void
}>()

const emitFiltersChanged = () => {
  const filters = {
    status: status.value,
    search: search.value
  }
  emit('changed', filters)
}

const facingResultsAvailable = () => {
  return Object.keys(FacingStatus)
}

const search = ref('')
const status = ref(facingResultsAvailable())

const searchChanged = (value: string) => {
  search.value = value
  emitFiltersChanged()
}

const checkChanged = (key: string) => {
  let i = status.value.findIndex((s) => s === key)
  if (i >= 0) {
    status.value.splice(i, 1)
  } else {
    status.value.push(key)
  }
  emitFiltersChanged()
}

</script>
