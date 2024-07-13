/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

// type First<T extends any[]> = any
// type First<T extends any[]> = T extends []? never : T[0]
// type First<T extends any[]> = T['length'] extends 0? never : T[0]
// type First<T extends any[]> = T extends {length:0} ? never : T[0]
// type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never
// type First<T extends any[]> = T extends [...any[], infer P] ? P : never
// type First<T extends any[]> = T extends [...infer D, infer P] ? D : never



type A = [boolean, string, number]
type A1 = []
type A2 = [number]
type A3 = [symbol, boolean, string, boolean]



type B = First<A>
type B1 = First<A1>
type B2 = First<A2>
type B3 = First<A3>









function Steve(message:string) {
  throw new Error(message)
}









const a = function Steve(message:string) {
  throw new Error(message)
}





// function error(message: string) {
//   throw new Error(message);
// }
// function infiniteLoop() {
//   while (true) {}
// }
// function fail() {
//   return error("Something failed");
// }


// type TupleWithRestIndividual = [number, string, ...any];

// const tuple3: TupleWithRestIndividual = [1, 'hello']; // Valid, no rest elements
// const tuple4: TupleWithRestIndividual = [1, 'hello', true, 'world']; // Valid, rest elements are individual elements

// type TupleWithRestArray = [number, string, ...any[]];

// const tuple1: TupleWithRestArray = [1, 'hello']; 
// const tuple2: TupleWithRestArray = [1, 'hello', true, 'world'] 

// type TupleWithRestString = [number, string, ...string];

// const tuple5: TupleWithRestString = [1, 'hello']; 
// const tuple6: TupleWithRestString = [1, 'hello', true, 'world'] 

// type TupleWithRestStringArray = [number, string, ...string[]];

// const tuple7: TupleWithRestStringArray = [1, 'hello']; 
// const tuple8: TupleWithRestStringArray = [1, 'hello', true, 'world']; 









/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/
