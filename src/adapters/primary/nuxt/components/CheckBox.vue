<template lang="pug">
.checkbox-component
  label.label.cursor-pointer
    span.label-text {{ label }}
    input.checkbox(
      type='checkbox'
      checked='checked'
      @change="checkChanged"
    )
</template>

<script lang="ts" setup>
defineProps({
  label: { type: String }
})

const emit = defineEmits<{
  (e: 'changed'): void
}>()

const checkChanged = () => {
  emit('changed')
}

</script>
