import { FacingStatus } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import {
  getPieChartVM,
  PieChartVM
} from '~/src/adapters/primary/view-model-generators/get-pie-chart/getPieChartViewModelGenerator'

describe('Get pie chart view model generator', () => {
  const data = [
    {
      cip7: 'productACip7',
      cip13: 'productACip13',
      cipDesignation: 'productACipDesignation',
      facingStatus: 'OK',
    },
    {
      cip7: 'productA2Cip7',
      cip13: 'productA2Cip13',
      cipDesignation: 'productA2CipDesignation',
      facingStatus: 'OK',
    },
    {
      cip7: 'productBCip7',
      cip13: 'productBCip13',
      cipDesignation: 'productBCipDesignation',
      facingStatus: 'ToIncrease',
    },
    {
      cip7: 'productCCip7',
      cip13: 'productCCip13',
      cipDesignation: 'productCCipDesignation',
      facingStatus: 'ToDecrease',
    },
    {
      cip7: 'productC2Cip7',
      cip13: 'productC2Cip13',
      cipDesignation: 'productC2CipDesignation',
      facingStatus: 'ToDecrease',
    },
    {
      cip7: 'productC3Cip7',
      cip13: 'productC3Cip13',
      cipDesignation: 'productC3CipDesignation',
      facingStatus: 'ToDecrease',
    }
  ]
  let vm: PieChartVM
  beforeEach(() => {
    vm = getPieChartVM(data)
  })
  it('should give labels', () => {
    const expectedLabels = [FacingStatus.OK, FacingStatus.ToDecrease, FacingStatus.ToIncrease]
    expect(vm.labels).toEqual(expectedLabels)
  })
  it('should give the number of each status', () => {
    const expectedData = [2, 3, 1]
    expect(vm.data).toEqual(expectedData)
  })
})
