/*
  268 - If
  -------
  by Pavel Glushkov (@pashutk) #easy #utils

  ### Question

  Implement the util type `If<C, T, F>` which accepts condition `C`, a truthy value `T`, and a falsy value `F`. `C` is expected to be either `true` or `false` while `T` and `F` can be any type.

  For example:

  ```ts
  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
  ```

  > View on GitHub: https://tsch.js.org/268
*/

/* _____________ Your Code Here _____________ */

// type If<C, T, F> = any

// Step 1
type If <C,T,F >  = C extends true?  T : F
type A = If<5, 6, 3> // X! 5 

// Step 2: C is a boolean value
type If2 <C extends Boolean,T,F >  = C extends true?  T : F
type A2 = If2<5, 6, 3> // X! 5 
type A3 = If2<true, 6, 3> 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/268/answer
  > View solutions: https://tsch.js.org/268/solutions
  > More Challenges: https://tsch.js.org
*/