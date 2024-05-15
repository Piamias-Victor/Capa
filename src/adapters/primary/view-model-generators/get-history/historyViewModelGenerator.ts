import { useFacingStore } from '~/src/store/facing'
import { computeFacing, ProductWithFacing } from '~/src/coreLogic/usecases/facing-creation/createFacing'

export interface HistoryVM {
  items: Array<HistoryItemVM>
}

export interface HistoryItemVM {
  to: string
  date: string
  items: Array<ProductWithFacing>
}

export const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const options: any = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }
  return date.toLocaleDateString('fr-FR', options)
}

export const getHistoryVM = (): HistoryVM => {
  const facingStore = useFacingStore()
  const history = facingStore.getAll
  return {
    items: Object.keys(history).sort().reverse().map((d: string) => {
      const facingResult = computeFacing(d, history[d])
      return {
        to: `/${facingResult.date}`,
        date: timestampToDate(+facingResult.date),
        items: facingResult.items
      }
    })
  }
}
