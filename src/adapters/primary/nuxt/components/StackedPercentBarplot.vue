<template lang="pug">
.stacked-percent-barplot
  apexchart(
    v-if="setChart"
    :height="props.height"
    :options="chartOptions"
    :series="series"
  )
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from '#imports'
import {
  getStackedPercentBarplotVM
} from '~/src/adapters/primary/view-model-generators/get-stacked-percent-barplot/getStackedPercentBarplotViewModelGenerator'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  data: { type: Array, required: true },
  height: { type: Number, default: 350 },
})

const { t } = useI18n()

const setChart = ref(false)
onMounted(() => {
  setTimeout(() => {
    setChart.value = true
  }, 50)
})

const viewModel = computed(() => {
  return getStackedPercentBarplotVM(props.data)
})

const series = computed(() => {
  return viewModel.value.data.map((d) => {
    return {
      name: t(`facingStatus.${d.name}`),
      data: d.data
    }
  })
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    colors: ['#00bfa0', '#ffa300', '#e60049'],
    xaxis: {
      categories: viewModel.value.columns,
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50
    },
  }
})

</script>
