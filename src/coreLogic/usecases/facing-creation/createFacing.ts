import { FacingGateway } from '~/src/coreLogic/gateways/facingGateway'
import Papa, { ParseError, ParseResult } from 'papaparse'
import { useFacingStore } from '~/src/store/facing'

export interface Product {
  cip7: string
  cip13: string
  designation: string
  salesByMonth: number
  maxCapacity: number
}

export enum FacingStatus {
  OK = 'OK',
  ToDecrease = 'ToDecrease',
  ToIncrease = 'ToIncrease'
}
export interface ProductWithFacing extends Product {
  facingStatus: FacingStatus
}

export interface FacingResult {
  date: string,
  items: Array<ProductWithFacing>
}

const parseProducts = (data: any): Array<Product> => {
  if (isNaN(data[0][0]))
    data.shift()
  const products: Array<Product> = data.map((d: any) => {
    return {
      cip7: d[0],
      cip13: d[1],
      designation: d[2],
      salesByMonth: +d[3],
      maxCapacity: +d[4]
    } as Product
  })
  return products
}

export async function parseCsv(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      transform: (value: string): string => {
        return value.trim()
      },
      complete: (results: ParseResult) => {
        return resolve(results)
      },
      error: (error: ParseError) => {
        return reject(error)
      }
    })
  })
}

export const computeFacing = (date: string, products: Array<Product>): FacingResult => {
  const limitMin = 0.26
  const limitMax = 0.74
  return {
    date,
    items: products.map((p) => {
      const ratio = p.salesByMonth / p.maxCapacity
      const facing: FacingStatus = ratio < limitMin ? FacingStatus.ToDecrease : ratio > limitMax ? FacingStatus.ToIncrease : FacingStatus.OK
      return {
        ...p,
        facingStatus: facing
      }
    })
  }
}

export const createFacing = async (file: File, facingGateway: FacingGateway): Promise<string> => {
  const facingStore = useFacingStore()
  facingStore.creatingFacing()
  const parsedFile = await parseCsv(file)
  const products = parseProducts(parsedFile.data)
  const date = await facingGateway.create(products)
  const facingResult = computeFacing(date, products)
  facingStore.create(facingResult)
  return date
}
