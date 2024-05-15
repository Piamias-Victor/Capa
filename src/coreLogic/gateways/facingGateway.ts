import { FacingHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'

export interface FacingGateway {
  getHistory(): Promise<FacingHistory>
  create(products: Array<Product>): Promise<string>
}
