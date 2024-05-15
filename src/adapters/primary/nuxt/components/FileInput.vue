<template lang="pug">
.relative.border-dashed.h-48.rounded-lg.border-2.border-gray-400.bg-gray-100.flex.justify-center.items-center(class='hover:border-solid')
  .absolute
    .flex.flex-col.items-center
      IconUploadFileOutline.text-gray-400.w-20.h-20
      span.block.text-gray-400.font-normal Cliquer ou d&eacute;poser le fichier CSV ici
  input.h-full.w-full.opacity-0(
    type="file"
    accept="text/csv"
    name=''
    @change="handleUpload"
  )
</template>

<script lang="ts" setup>
import IconUploadFileOutline from '~icons/material-symbols/upload-file-outline'

const emit = defineEmits<{
  (e: 'upload', value: File): void
}>()

const handleUpload = async (e: any) => {
  const file: File = e.target.files[0]
  emit('upload', file)
}
</script>
