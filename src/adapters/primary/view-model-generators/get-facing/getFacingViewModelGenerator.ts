import { timestampToDate } from '~/src/adapters/primary/view-model-generators/get-history/historyViewModelGenerator'
import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { useFacingStore } from '~/src/store/facing'

export interface FacingVM {
  date: string
  items: Array<FacingItemVM>
}

export interface FacingItemVM {
  cip7: string
  cip13: string
  designation: string
  facingStatus: FacingStatus
}

export interface FacingFilters {
  status: Array<FacingStatus>
  search: string
}

export const getFacingVM = (timestamp: string, filters?: Partial<FacingFilters>): FacingVM => {
  const facingStore = useFacingStore()
  const facing = facingStore.get(timestamp)
  if (filters?.status) {
    facing.items = facing.items.filter((i) => {
      return filters.status?.includes(i.facingStatus)
    })
  }
  if (filters?.search) {
    facing.items = facing.items.filter((i) => {
      const str = i.cip7 + i.cip13 + i.designation
      return str.toLowerCase().includes(filters.search?.toLowerCase())
    })
  }
  return {
    date: timestampToDate(+timestamp),
    items: facing.items.map((i) => {
      return {
        cip7: i.cip7,
        cip13: i.cip13,
        designation: i.designation,
        facingStatus: i.facingStatus
      }
    })
  }
}
