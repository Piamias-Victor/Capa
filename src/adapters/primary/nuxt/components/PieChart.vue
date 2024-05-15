<template lang="pug">
.pie-chart
  apexchart(
    v-if="setChart"
    :width="props.width"
    :options="chartOptions"
    :series="series"
  )
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from '#imports'
import { getPieChartVM } from '~/src/adapters/primary/view-model-generators/get-pie-chart/getPieChartViewModelGenerator'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const viewModel = computed(() => {
  return getPieChartVM(props.data)
})

const series = computed(() => {
  return viewModel.value.data
})

const chartOptions = computed(() => {
  const labels = viewModel.value.labels.map(label => t(`facingStatus.${label}`))
  return {
    chart: {
      type: 'donut',
    },
    fill: {
      type: 'gradient',
    },
    colors: ['#00bfa0', '#ffa300', '#e60049'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true
            }
          }
        }
      }
    },
    labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 350
        },
      }
    }]
  }
})
const props = defineProps({
  data: { type: Array, required: true },
  width: { type: Number, default: 350 },
  height: { type: Number, default: 350 },
  margin: { type: Number, default: 40 },
  innerRadius: { type: Number, default: 0 },
  colors: {
    type: Array,
    default: () => ['#238823', '#D2222D', '#FFBF00']
  },
  strokeColor: { type: String, default: 'black' },
  strokeWidth: { type: String, default: '1px' },
  displayLegend: { type: Boolean, default: true }
})

const setChart = ref(false)
onMounted(() => {
  setTimeout(() => {
    setChart.value = true
  }, 100)
})
</script>
