import { FacingGateway } from '../../coreLogic/gateways/facingGateway'
import { FacingHistory } from 'src/coreLogic/usecases/history-listing/listHistory'
import { Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { DateProvider } from '~/src/coreLogic/gateways/dateProvider'

export class InMemoryFacingGateway implements FacingGateway {
  private facingHistory: FacingHistory = {}
  private dateProvider: DateProvider

  constructor(dateProvider: DateProvider) {
    this.dateProvider = dateProvider
  }

  async getHistory(): Promise<FacingHistory> {
    return this.facingHistory
  }

  feedWith(facingHistory: FacingHistory) {
    this.facingHistory = facingHistory
  }

  create(products: Array<Product>): Promise<string> {
    return Promise.resolve(this.dateProvider.now())
  }
}
