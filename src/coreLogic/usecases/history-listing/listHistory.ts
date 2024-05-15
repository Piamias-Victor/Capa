import { FacingGateway } from '../../gateways/facingGateway'
import { useFacingStore } from '~/src/store/facing'
import { Product } from '~/src/coreLogic/usecases/facing-creation/createFacing'

export const listHistory = async (facingGateway: FacingGateway): Promise<void> => {
  const facingHistory = await facingGateway.getHistory()
  const facingStore = useFacingStore()
  facingStore.listHistory(facingHistory)
}

export interface HashTable<T> {
  [key: string]: T
}

export type FacingHistory = HashTable<Product>
