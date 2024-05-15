import { useFacingStore } from '~/src/store/facing'
import { createPinia, setActivePinia } from 'pinia'
import { InMemoryFacingGateway } from '~/src/adapters/secondary/inMemoryFacingGateway'
import {
  createFacing,
  FacingResult,
  FacingStatus,
  Product
} from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { FakeDateProvider } from '~/src/adapters/secondary/fakeDateProvider'

describe('Facing creation', () => {
  let facingStore: any
  const dateProvider: FakeDateProvider = new FakeDateProvider()
  const facingGateway: InMemoryFacingGateway = new InMemoryFacingGateway(dateProvider)
  beforeEach(() => {
    setActivePinia(createPinia())
    facingStore = useFacingStore()
  })
  describe('There is no previous history', () => {
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
    const date = '1664575200'
    const expectedFacing: FacingResult = {
      date,
      items: [
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
    let csvFile: File
    let createdDate: string
    beforeEach(() => {
      dateProvider.feedWith(date)
      const content = '' +
        `${productToCsv(productA)}\n` +
        `${productToCsv(productB)}\n` +
        `${productToCsv(productC)}\n`
      csvFile = new File([content], 'csvFile')
    })
    it('should compute the facing from a csv without header', async () => {
      await createFacing(csvFile, facingGateway)
      expect(facingStore.getAll).toEqual({ [expectedFacing.date]: expectedFacing.items })
    })
    it('should compute the facing from a csv with header', async () => {
      await createFacing(csvFile, facingGateway)
      expect(facingStore.getAll).toEqual({ [expectedFacing.date]: expectedFacing.items })
    })
    it('should return the created date', async () => {
      const createdDate = await createFacing(csvFile, facingGateway)
      expect(createdDate).toEqual(date)
    })
    it('should be aware during loading', async () => {
      const unsubscribe = facingStore.$subscribe((mutation: any, state: any) => {
        expect(state.isLoading).toBeTruthy()
        unsubscribe()
      })
      await createFacing(csvFile, facingGateway)
    })
    it('should be aware when loading is done', async () => {
      await createFacing(csvFile, facingGateway)
      expect(facingStore.isLoading).toBeFalsy()
    })
  })
  const productToCsv = (product: Product): string => {
    return `${product.cip7},${product.cip13},${product.designation},${product.salesByMonth},${product.maxCapacity}`
  }
})
