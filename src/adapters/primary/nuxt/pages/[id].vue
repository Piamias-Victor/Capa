<template lang="pug">
.facing-id
  div.container.mx-auto
    div.flex.justify-between.items-center.no-printme
      div.flex.flex-col.justify-between
        h2.py-8 {{ $t('facing.title', { date }) }}
        facing-filters(
          @changed="filtersChanged"
        )
      pie-chart(
        :data="items"
        :width="450"
        :height="300"
      )
    div.divider.no-printme
    div.no-printme.flex.justify-end
      button.btn.btn-secondary.mb-4(@click="download") Télécharger
    grid-table.printme(
      :data="items"
      name="facing"
    )
      template(#facingStatus="{ value }")
        facing-result-column(:status="value" :key="value")
</template>

<style lang="scss" scoped>
</style>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, useRoute } from '#imports'
import { listHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { facingGateway } from '~/gateways/gateways'
import {
  getFacingVM
} from '~/src/adapters/primary/view-model-generators/get-facing/getFacingViewModelGenerator'
import FacingResultColumn from '~/src/adapters/primary/nuxt/components/FacingResultColumn.vue'
import { definePageMeta } from '#imports'
import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'

definePageMeta({ layout: 'main' })

const route = useRoute()
const timestamp = route.params.id

onMounted(() => {
  listHistory(facingGateway)
})

const filters = reactive({
  status: Object.keys(FacingStatus),
  search: ''
})

const filtersChanged = (newFilters: any) => {
  filters.status = newFilters.status
  filters.search = newFilters.search
}

const facingVM = computed(() => {
  return getFacingVM(timestamp, filters)
})

const items = computed(() => {
  return facingVM.value.items
})

const date = computed(() => {
  return facingVM.value.date
})

const download = () => {
  window.print()
}

</script>
