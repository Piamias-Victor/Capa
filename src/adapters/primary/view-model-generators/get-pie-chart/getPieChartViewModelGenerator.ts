import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { FacingItemVM } from '~/src/adapters/primary/view-model-generators/get-facing/getFacingViewModelGenerator'

export interface PieChartVM {
  labels: Array<string>
  data: Array<number>
}

const getData = (data: Array<FacingItemVM>, keys: Array<FacingStatus>): Array<number> => {
  return keys.map((status) => {
    return data.filter((d) => d.facingStatus === status).length
  })
}

export const getPieChartVM = (data: Array<FacingItemVM>): PieChartVM => {
  const labels = Object.keys(FacingStatus)
  return {
    labels,
    data: getData(data, labels)
  }
}
