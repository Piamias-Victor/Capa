import { createPinia, setActivePinia } from 'pinia'
import { getHistoryVM, HistoryVM } from './historyViewModelGenerator'
import { useFacingStore } from '~/src/store/facing'
import { FacingHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { FacingStatus, Product, ProductWithFacing } from '~/src/coreLogic/usecases/facing-creation/createFacing'

describe('Available facings view model generator', () => {
  let facingListStore
  const productA: Product = {
    cip7: 'productACip7',
    cip13: 'productACip13',
    designation: 'productADesignation',
    salesByMonth: 5,
    maxCapacity: 10,
  }
  const productB: Product = {
    cip7: 'productBCip7',
    cip13: 'productBCip13',
    designation: 'productBDesignation',
    salesByMonth: 1,
    maxCapacity: 15,
  }
  const productC: Product = {
    cip7: 'productCCip7',
    cip13: 'productCCip13',
    designation: 'productCDesignation',
    salesByMonth: 15,
    maxCapacity: 2,
  }

  beforeEach(() => {
    setActivePinia(createPinia())
    facingListStore = useFacingStore()
    const facingHistory: FacingHistory = {
      '1664575200': [productA],
      '1661983200': [productA, productB],
      '1659304800': [productA, productB, productC],
      '1656626400': [productA, productC]
    }
    facingListStore.listHistory(facingHistory)
  })
  it('should display date correctly formated sorted desc', () => {
    const expectedProductA: ProductWithFacing = {
      ...productA,
      facingStatus: FacingStatus.OK
    }
    const expectedProductB: ProductWithFacing = {
      ...productB,
      facingStatus: FacingStatus.ToDecrease
    }
    const expectedProductC: ProductWithFacing = {
      ...productC,
      facingStatus: FacingStatus.ToIncrease
    }
    const expectedHistoryView: HistoryVM = {
      items: [
        { to: '/1664575200', date: '01/10/2022', items: [expectedProductA] },
        { to: '/1661983200', date: '01/09/2022', items: [expectedProductA, expectedProductB] },
        { to: '/1659304800', date: '01/08/2022', items: [expectedProductA, expectedProductB, expectedProductC] },
        { to: '/1656626400', date: '01/07/2022', items: [expectedProductA, expectedProductC] }
      ]
    }
    expect(getHistoryVM()).toEqual(expectedHistoryView)
  })
})
