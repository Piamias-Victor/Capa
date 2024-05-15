import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { HistoryItemVM } from '~/src/adapters/primary/view-model-generators/get-history/historyViewModelGenerator'

export interface StackedPercentBarplotVM {
  columns: Array<string>
  data: Array<StackedPercentBarplotItem>
}

export interface StackedPercentBarplotItem {
  name: string
  data: Array<number>
}

const countNumberOfStatusByDate = (data: Array<HistoryItemVM>): Array<StackedPercentBarplotItem> => {
  return Object.keys(FacingStatus).map((status) => {
    return {
      name: status,
      data: data.map((data: any) => {
        return data.items.filter((i: any) => i.facingStatus === status).length
      })
    }
  })
}

export const getStackedPercentBarplotVM = (data: Array<HistoryItemVM>): StackedPercentBarplotVM => {
  return {
    columns: data.map((d: HistoryItemVM) => d.date),
    data: countNumberOfStatusByDate(data)
  }
}
