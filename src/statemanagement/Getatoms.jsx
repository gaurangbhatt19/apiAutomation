import {selector} from "recoil"
import { pieAtom, tableAtom,requestAtom,headersAtom,numoftestAtom } from "./atoms"

  export const PieDataSelector=selector({
    key:"pie_selector",
    get:({get})=>{
        const value=get(pieAtom)
        return value
    }
})

export const tableAtomValue=selector({
    key:"table_selector",
    get:({get})=>{
        const tableValue=get(tableAtom)
        return tableValue
    }
})

export const requestSelector = selector({
    key:"request_selector",
    get:({get})=>{
      return get(requestAtom)
    }
})
export const headersSelector= selector({
    key:"headers_selector",
    get:({get})=>{
        return get(headersAtom)
    }

})
export const numoftestSelector=selector({
    key:"numoftest_selector",
    get:({get})=>{
        return get(numoftestAtom)
    }
})
