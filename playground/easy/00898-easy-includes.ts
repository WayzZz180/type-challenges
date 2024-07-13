`1`/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. 
  The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U> = any

type XP<T extends true> = T


// readonly any?
  type Includes<T extends any[], U> = T extends [infer First, ...infer Rest] ? 
  (Equal<First, U> extends true ? true :  Includes<Rest, U> ): 
    false


// 空Array是否還有值判斷? 核心概念 [] extends [infer First, ...infer Rest] ? true ("還有elements") : false ("空了")
// empty[] 和 [infer First, ...infer Rest] 關係
// type InferFirst <T> = T extends [infer First, ...infer Rest] ? First: false
// type InferRest <T> = T extends [infer First, ...infer Rest] ? Rest: false
  

// infer first and rest
type EmptyArray = [] extends any[] ? true : false // true
type EmptyArrayFirst = [] extends [infer First, ...infer Rest] ? First : false // false
type OneElementFirst = [1] extends [infer First, ...infer Rest] ? First : false // 1
type OneElementRest = [1] extends [infer First, ...infer Rest] ? Rest : false // []
type ElementsFirst = [1,'hi'] extends [infer First, ...infer Rest] ? First : false // 1
type ElementsRest = [1,'hi'] extends [infer First, ...infer Rest] ? Rest : false // ['hi']


// Q: what if we want 'U' to be an array, and if any of the elements inside it suffice would be okay?
// step1: 最終比較仍然是單一Elements比 因此我們需要: 1. 遞迴比較 - 單一 + 遍歷? 

type IncludesArrayAny<T extends any[], U extends any[]> = 
U extends [infer First, ...infer Rest] ? 
(Includes<T, First> extends true ? true :  IncludesArrayAny<T, Rest> ): 
  false

// Q: what if we want 'U' to be an array, and we need all of them included to satisfy?
type IncludesArrayAll<T extends any[], U extends any[]> =
  U extends [infer First, ...infer Rest]
 ? (Includes<T, First> extends true ? (Rest extends [] ? true : IncludesArrayAll<T, Rest>) : false) 
  : false;

// opposite 
// type IncludesArrayAll<T extends any[], U extends any[]> =
//   U extends [infer First, ...infer Rest] ? (Includes<T, First> extends false ? false : (Rest extends [] ? true : IncludesArrayAll<T, Rest>)) : false
   

// Danny's version  // why is it wrong?
type DannyIncludeArrayAll<T extends any [], U extends any[]> = Includes<T,U[number]>

type Danny<U extends any[]> = U[number]
// U[number] returns a union of all element types in U.
// Includes<T, U[number]> checks if each type in the union U[number] is included in the array T.

type Result = Danny<[1,2,3]> 
  // ^?



// any element
type Wz = Expect<Equal<IncludesArrayAny<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'],  ['Black Pink!']>, true>>
type Wz2 = Expect<Equal<IncludesArrayAny<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'], ['Black Pink!', 'Bruno Mars']>, true>>

// all elements
type Wz3 = Expect<Equal<IncludesArrayAll<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'],  ['Black Pink!', 'Bruno Mars']>, true>>
type Wz4 = Expect<Equal<IncludesArrayAll<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'], ['Wamuu', 'Bruno Mars']>, true>>
type Wz41 = Expect<Equal<IncludesArrayAll<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'], []>, true>>
type Wz5 = Expect<Equal<DannyIncludeArrayAll<['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'], ['Wamuu', 'Bruno Mars']>, true>>
// Checks if both 'Wamuu' and 'Bruno Mars' (union type 'Wamuu' | 'Bruno Mars') are included in the array ['Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'].
// The result will be true if both 'Wamuu' and 'Bruno Mars' are found in the first array, otherwise false.
type Wz6 = Expect<Equal<DannyIncludeArrayAll<['Wamuu' | 'Bruno Mars', 'Kars', 'Esidisi', 'Wamuu', 'Bruno Mars'], ['Wamuu', 'Bruno Mars']>, true>>
// If there's indeed a 'Wamuu' | 'Bruno Mars', this would then be correct



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/
