




type Fn1Type = (a: string, b: number) => void
type Fn2Type = (c:boolean) => void
// type Fn3Type = (c:boolean, d:string, dd:boolean) => void

type Unpacked<T> = T extends (...args: any[]) => infer U ? U : never
type UnpackedFirstType<T> = T extends (fistArg: infer U, ...args: string[]) => any ? U : never
// 可能可以判定傳進去的參數[0]要做什麼[1]要做什麼

type UnpackedFirstType2<T> = T extends (fistArg: infer U, ...args: [string, boolean]) => any ? U : never
// does it really extend?



type UnpackFn1Type = UnpackedFirstType<Fn1Type>
type UnpackFn2Type = UnpackedFirstType<Fn2Type> 
// type UnpackFn3Type = UnpackedFirstType2<Fn3Type> 

// ...args是什麼？為什麼Fn1Type不是回傳never?


// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#tuples-in-rest-parameters-and-spread-expressions