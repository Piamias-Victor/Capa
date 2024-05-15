<template lang="pug">
input.input.input-bordered.input-secondary.w-full.max-w-xs(
  type='text'
  :placeholder="placeholder"
  @input="inputChanged"
)
</template>

<script lang="ts" setup>
defineProps({
  placeholder: { type: String }
})

const emit = defineEmits<{
  (e: 'changed', value: string): void
}>()

const inputChanged = (e: any) => {
  emit('changed', e.target.value)
}
</script>
