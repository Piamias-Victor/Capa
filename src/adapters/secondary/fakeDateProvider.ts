import { DateProvider } from '~/src/coreLogic/gateways/dateProvider'

export class FakeDateProvider implements DateProvider {
  private date = ''

  now(): string {
    return this.date
  }

  feedWith(date: string) {
    this.date = date
  }
}
