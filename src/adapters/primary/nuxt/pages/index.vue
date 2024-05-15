<template lang="pug">
.index.container.mx-auto.align-middle
  stacked-percent-barplot.mx-auto.mb-8(
    :data="reversedHistory"
  )
  .grid.grid-cols-4.gap-8
    div(v-for="(facing, index) in history" :key="index")
      NuxtLink.facingCard(
        :to="facing.to"
      )
        .card-body.items-center.text-center
          h2.card-title.my-8 Facing du {{ facing.date }}
          .card-actions.justify-end
            button.btn.btn-primary Voir
</template>

<script lang="ts" setup>
import { computed, definePageMeta, onMounted } from '#imports'
import { listHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { facingGateway } from '~/gateways/gateways'
import { getHistoryVM } from '~/src/adapters/primary/view-model-generators/get-history/historyViewModelGenerator'
import StackedPercentBarplot from '~/src/adapters/primary/nuxt/components/StackedPercentBarplot.vue'

definePageMeta({ layout: 'main' })

onMounted(() => {
  listHistory(facingGateway)
})

const history = computed(() => getHistoryVM().items)
const reversedHistory = computed(() => getHistoryVM().items.reverse())
</script>

<style lang="scss" scoped>
.title {
  width: 160px;
  height: 130px;
}
.facingCard {
  @apply card bg-neutral text-neutral-content transform transition duration-500 hover:scale-110;
}
</style>
