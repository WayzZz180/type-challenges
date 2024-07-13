/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is a wrapped type like Promise, how we can get the type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

// type MyAwaited<T> = any

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends PromiseLike<any>
    ? MyAwaited<U>
    : U
  : never;




type a = MyAwaited<Promise<string>>
  

type asss = Awaited<Promise<string>>

// Q1 when'd we use PromiseLike?
// Q2 Promise extends PromiseLike ? how?


// promise and promiseLike
// https://stackoverflow.com/questions/43712705/why-does-typescript-use-like-types
// -----

// type A = Promise<string> extends PromiseLike<string> ? true:false
// type A1 = PromiseLike<string> extends Promise<string> ? true:false
// type B = Array<string> extends ArrayLike<string> ? true:false
// type B1 = ArrayLike<string> extends Array<string> ? true:false
  


// infer
// type ExampleType = Promise<number>;
// type ExtractedType = ExampleType extends PromiseLike<infer U> ? U : never;

/* when TypeScript infers or deduces a type using infer U in the context of T extends PromiseLike<infer U>, 
it attempts to find the most specific type U that satisfies the condition imposed by PromiseLike<T>. */

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
