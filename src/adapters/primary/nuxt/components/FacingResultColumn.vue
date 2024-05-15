<template lang="pug">
.facing-result-column.flex.items-center.gap-2(
  :class="facing.class"
)
  component(
    :is="facing.icon"
  )
  div {{ $t(`facingStatus.${value}`) }}
</template>

<script lang="ts" setup>
import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import CheckCircle from '~icons/material-symbols/check-circle'
import TrendingUp from '~icons/material-symbols/trending-up'
import TrendingDown from '~icons/material-symbols/trending-down'
import { computed, ref } from '#imports'

const props = defineProps({
  status: { type: String, required: true }
})

const value = ref(props.status)

const display = {
  [FacingStatus.OK]: {
    icon: CheckCircle,
    class: 'text-green-700'
  },
  [FacingStatus.ToIncrease]: {
    icon: TrendingUp,
    class: 'text-red-700'
  },
  [FacingStatus.ToDecrease]: {
    icon: TrendingDown,
    class: 'text-yellow-500'
  }
}

const facing = computed(() => {
  return display[value.value]
})

</script>
