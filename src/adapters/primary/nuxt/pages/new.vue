<template lang="pug">
.container.mx-auto
  h2.py-8.text-center {{ $t('facing.new.title') }}
  spinner(
    v-if="isLoading"
  )
  file-input(
    v-else
    @upload="handleUpload"
  )

</template>

<script lang="ts" setup>
import { createFacing } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { facingGateway } from '~/gateways/gateways'
import { computed, definePageMeta, useRouter } from '#imports'
import { useFacingStore } from '~/src/store/facing'

definePageMeta({ layout: 'main' })

const isLoading = computed(() => {
  const store = useFacingStore()
  return store.isLoading
})

const handleUpload = async (file: File) => {
  const timestamp = await createFacing(file, facingGateway)
  const router = useRouter()
  await router.push({ path: `/${timestamp}` })
}
</script>
