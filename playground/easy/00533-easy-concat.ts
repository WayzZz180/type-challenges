/*
  533 - Concat
  -------
  by Andrey Krasovsky (@bre30kra69cs) #easy #array

  ### Question

  Implement the JavaScript `Array.concat` function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order

  For example:

  ```ts
  type Result = Concat<[1], [2]> // expected to be [1, 2]
  ```

  > View on GitHub: https://tsch.js.org/533
*/

/* _____________ Your Code Here _____________ */

// type Concat<T, U> = any

type A = any []
type B = readonly any[]
type C = unknown []
type D = readonly unknown[]

type Aa = any
type Cc = unknown

// readonly ">"
type Test = A extends B ? 'true' : 'false'
  // ^? 
type Test2 = B extends A ? 'true' : 'false'
  // ^? 

// any - unknown?
type Test33 = Aa extends Cc ? 'true' : 'false'
  // ^? 
type Test44 = Cc extends Aa ? 'true' : 'false'
  // ^? 

// any[] - unknown[]?
type Test3 = A extends C ? 'true' : 'false'
  // ^? 
type Test4 = C extends A ? 'true' : 'false'
  // ^? 

// any, unknown 彼此接受

// draft...
// type Test5 = A extends D? 1:2
// type Test6 = A extends D? 1:2



type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];
type Concat2<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

type HHH = [string, boolean]
// type AAA = ['6']
// const a = [6,'2',true]
const b = [6,'2',true] as const

type Haha =  'haha'[]

type PassPlease = Concat<HHH, typeof b>
    // ^?

// ...X, where X is an array type. 
// A rest element indicates that the tuple type is open-ended and may have zero or more additional elements of the array element type


type TupleWithRestArray = [number, string, ...any];

const tuple1: TupleWithRestArray = [1, 'hello']; // Valid, no rest elements
const tuple2: TupleWithRestArray = [1, 'hello', true, 'world'] // Valid, rest elements form an array


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = [1] as const


type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

// @ts-expect-error
type error = Concat<null, undefined>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/533/answer
  > View solutions: https://tsch.js.org/533/solutions
  > More Challenges: https://tsch.js.org
*/
