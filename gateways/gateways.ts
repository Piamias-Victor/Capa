import { InMemoryFacingGateway } from '../src/adapters/secondary/inMemoryFacingGateway'
import { FacingHistory } from 'src/coreLogic/usecases/history-listing/listHistory'
import { FacingStatus, Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { RealDateProvider } from '~/src/adapters/secondary/realDateProvider'

export const facingGateway: InMemoryFacingGateway = new InMemoryFacingGateway(new RealDateProvider())
const productA: Product = {
  cip7: '1234567',
  cip13: '1234567891234',
  designation: 'A super long designation',
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
    },
    {
      ...productC,
      facingStatus: FacingStatus.ToIncrease
    }
  ],
  '1661983200': [
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
    },
  ],
  '1659304800': [
    {
      ...productA,
      facingStatus: FacingStatus.OK
    },
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
    },
  ],
  '1656626400': [
    {
      ...productA,
      facingStatus: FacingStatus.OK
    },
    {
      ...productB,
      facingStatus: FacingStatus.ToDecrease
    },
    {
      ...productB,
      facingStatus: FacingStatus.ToDecrease
    },
    {
      ...productC,
      facingStatus: FacingStatus.ToIncrease
    },
  ],
}
facingGateway.feedWith(facingHistory)
