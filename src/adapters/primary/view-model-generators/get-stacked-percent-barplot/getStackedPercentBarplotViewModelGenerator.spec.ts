import { FacingStatus, ProductWithFacing } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import {
  getStackedPercentBarplotVM, StackedBarplotGroupVM, StackedPercentBarplotParams,
  StackedPercentBarplotVM
} from '~/src/adapters/primary/view-model-generators/get-stacked-percent-barplot/getStackedPercentBarplotViewModelGenerator'
import { HistoryItemVM } from '~/src/adapters/primary/view-model-generators/get-history/historyViewModelGenerator'

describe('Get stacked percent barplot view model generator', () => {
  let vm: StackedPercentBarplotVM
  const productA: ProductWithFacing = {
    cip7: 'ACip7',
    cip13: 'ACip13',
    designation: 'A',
    salesByMonth: 5,
    maxCapacity: 10,
    facingStatus: FacingStatus.OK
  }
  const productB: ProductWithFacing = {
    cip7: 'BCip7',
    cip13: 'BCip13',
    designation: 'B',
    salesByMonth: 1,
    maxCapacity: 10,
    facingStatus: FacingStatus.ToDecrease
  }
  const productC: ProductWithFacing = {
    cip7: 'CCip7',
    cip13: 'CCip13',
    designation: 'C',
    salesByMonth: 10,
    maxCapacity: 10,
    facingStatus: FacingStatus.ToIncrease
  }
  const data: Array<HistoryItemVM> = [
    {
      to: '',
      date: '01/07/2022',
      items: [productA, productB, productB, productC]
    },
    {
      to: '',
      date: '01/08/2022',
      items: [productA, productA, productB, productC]
    },
    {
      to: '',
      date: '01/09/2022',
      items: [productA, productB, productC]
    },
    {
      to: '',
      date: '01/10/2022',
      items: [productA, productB, productC, productC]
    }
  ]
  beforeEach(() => {
    const params: StackedPercentBarplotParams = {
      width: 800,
      height: 200
    }
    vm = getStackedPercentBarplotVM(data, params)
  })
  it('should give columns as date sorted desc', () => {
    const expectedColumns = ['01/07/2022', '01/08/2022', '01/09/2022', '01/10/2022']
    expect(vm.columns).toEqual(expectedColumns)
  })
  it('should group the items by status', () => {
    const expectedSeries = [
      {
        name: FacingStatus.OK,
        data: [1, 2, 1, 1]
      },
      {
        name: FacingStatus.ToDecrease,
        data: [2, 1, 1, 1]
      },
      {
        name: FacingStatus.ToIncrease,
        data: [1, 1, 1, 2]
      }
    ]
    expect(vm.data).toEqual(expectedSeries)
  })
})
