import { DateProvider } from '~/src/coreLogic/gateways/dateProvider'

export class RealDateProvider implements DateProvider {
  now(): string {
    return Math.floor(Date.now() / 1000).toString()
  }
}
