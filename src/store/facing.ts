import { defineStore } from 'pinia'
import { FacingHistory } from '~/src/coreLogic/usecases/history-listing/listHistory'
import { FacingResult } from '~/src/coreLogic/usecases/facing-creation/createFacing'
import { useLocalStorage } from '@vueuse/core'

export const useFacingStore = defineStore('FacingListStore', {
  state: () => {
    return {
      items: useLocalStorage('facingStore:items', '{}'),
      isLoading: false
    }
  },
  getters: {
    getAll: (state) => JSON.parse(state.items),
    get: (state) => (timestamp: string): FacingResult => {
      const items = JSON.parse(state.items)[timestamp]
      return {
        date: timestamp,
        items
      }
    }
  },
  actions: {
    listHistory(history: FacingHistory) {
      const oldHistory = this.getAll
      const newHistory = Object.assign({}, oldHistory, history)
      this.items = JSON.stringify(newHistory)
    },
    creatingFacing() {
      this.isLoading = true
    },
    create(result: FacingResult) {
      const items = this.getAll
      items[result.date] = result.items
      this.items = JSON.stringify(items)
      this.isLoading = false
    }
  }
})
