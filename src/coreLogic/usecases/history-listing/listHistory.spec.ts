import { createPinia, setActivePinia } from 'pinia'
import { InMemoryFacingGateway } from '~/src/adapters/secondary/inMemoryFacingGateway'
import { FacingHistory, listHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { useFacingStore } from '~/src/store/facing'
import { FakeDateProvider } from '~/src/adapters/secondary/fakeDateProvider'
import { Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'

describe('Listing facing history', () => {
  let facingStore: any
  const facingGateway: InMemoryFacingGateway = new InMemoryFacingGateway(new FakeDateProvider())
  const productA: Product = {
    cip7: 'productACip7',
    cip13: 'productACip13',
    designation: 'productADesignation',
    salesByMonth: 10,
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
    facingStore = useFacingStore()
  })
  describe('The history is empty', () => {
    it('should return an empty array', async () => {
      await listHistoryUseCase()
      expect(facingStore.getAll).toEqual({})
    })
  })
  describe('The history is not empty', () => {
    it('should save the history in the store', async () => {
      const facingHistory: FacingHistory = {
        '1664575200': [productA],
        '1661983200': [productA, productB],
        '1659304800': [productA, productB, productC],
        '1656626400': [productA, productC]
      }
      facingGateway.feedWith(facingHistory)
      await listHistoryUseCase()
      expect(facingStore.getAll).toEqual(facingHistory)
    })
  })
  const listHistoryUseCase = async () => {
    await listHistory(facingGateway)
  }
})
