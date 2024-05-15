import { createPinia, setActivePinia } from 'pinia'
import { useFacingStore } from '~/src/store/facing'
import { FacingHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { FacingStatus, Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import {
  FacingFilters,
  FacingItemVM,
  getFacingVM
} from '~/src/adapters/primary/view-model-generators/get-facing/getFacingViewModelGenerator'

describe('Get facing view model generator', () => {
  const productA: Product = {
    cip7: '1234567',
    cip13: '1234567891234',
    designation: 'A',
    salesByMonth: 6,
    maxCapacity: 12
  }
  const productB: Product = {
    cip7: '7654321',
    cip13: '4321987654321',
    designation: 'B',
    salesByMonth: 1,
    maxCapacity: 8,
  }
  const productC: Product = {
    cip7: '3217654',
    cip13: '7654321432198',
    designation: 'C',
    salesByMonth: 22,
    maxCapacity: 24,
  }

  let facingListStore
  beforeEach(() => {
    setActivePinia(createPinia())
    facingListStore = useFacingStore()
    const facingHistory: FacingHistory = {
      '1664575200': [
        {
          ...productA,
          facingStatus: FacingStatus.OK
        },
        {
          ...productB,
          facingStatus: FacingStatus.ToDecrease
        },
        {
          ...productC,
          facingStatus: FacingStatus.ToIncrease
        }
      ]
    }
    facingListStore.listHistory(facingHistory)
  })
  it('should set the date correctly formatted', () => {
    const expectedDate = '01/10/2022'
    expect(getFacingVM('1664575200').date).toEqual(expectedDate)
  })
  it('should set products with facing status only', () => {
    const expectedItems: Array<FacingItemVM> = [
      {
        cip7: productA.cip7,
        cip13: productA.cip13,
        designation: productA.designation,
        facingStatus: FacingStatus.OK
      },
      {
        cip7: productB.cip7,
        cip13: productB.cip13,
        designation: productB.designation,
        facingStatus: FacingStatus.ToDecrease
      },
      {
        cip7: productC.cip7,
        cip13: productC.cip13,
        designation: productC.designation,
        facingStatus: FacingStatus.ToIncrease
      }
    ]
    expect(getFacingVM('1664575200').items).toEqual(expectedItems)
  })
  describe('Filters', () => {
    describe('Facing status', () => {
      it('should allow to filter on one status', () => {
        const filters: Partial<FacingFilters> = {
          status: [FacingStatus.OK]
        }
        const expectedItems: Array<FacingItemVM> = [
          {
            cip7: productA.cip7,
            cip13: productA.cip13,
            designation: productA.designation,
            facingStatus: FacingStatus.OK
          }
        ]
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
      it('should allow to filter on multiple status', () => {
        const filters: Partial<FacingFilters> = {
          status: [FacingStatus.OK, FacingStatus.ToIncrease]
        }
        const expectedItems: Array<FacingItemVM> = [
          {
            cip7: productA.cip7,
            cip13: productA.cip13,
            designation: productA.designation,
            facingStatus: FacingStatus.OK
          },
          {
            cip7: productC.cip7,
            cip13: productC.cip13,
            designation: productC.designation,
            facingStatus: FacingStatus.ToIncrease
          }
        ]
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
    })
    describe('Search', () => {
      const expectedItems: Array<FacingItemVM> = [
        {
          cip7: productA.cip7,
          cip13: productA.cip13,
          designation: productA.designation,
          facingStatus: FacingStatus.OK
        }
      ]
      it('should allow to search on cip7', () => {
        const filters: Partial<FacingFilters> = {
          search: productA.cip7
        }
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
      it('should allow to search on cip13', () => {
        const filters: Partial<FacingFilters> = {
          search: productA.cip13
        }
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
      it('should allow to search on designation', () => {
        const filters: Partial<FacingFilters> = {
          search: productA.designation
        }
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
      it('should allow to search without case sensitive', () => {
        const filters: Partial<FacingFilters> = {
          search: productA.designation.toLowerCase()
        }
        expect(getFacingVM('1664575200', filters).items).toEqual(expectedItems)
      })
    })
  })
})
