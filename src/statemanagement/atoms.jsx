import {atom} from "recoil"

export const pieAtom=atom({
    key:"pie_data",
    default:[1,1]
})
export const lineChart=atom({
    key:"line_chart",
    default:[1,2,3,4]
})

export const tableAtom=atom({
    key:"table_data",
    default:[]
})

export const requestAtom=atom({
    key:"request_atom",
    default:"{}"
})

export const headersAtom=atom({
    key:"headers_atom",
    default:'{\n\t"Content-Type":"application/json"\n}'
})
export const numoftestAtom=atom({
    key:"numoftest",
    default:0
})