/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #easy #tuple

  ### Question

  For given a tuple, you need create a generic `Length`, pick the length of the tuple

  For example:

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > View on GitHub: https://tsch.js.org/18
*/

/* _____________ Your Code Here _____________ */

// type Length<T> = any
type Length<T extends readonly any[]> = T['length']




// as const 明確告訴TS不可變的

type Length2<T extends any[]> = T['length']
type B = Length2<typeof tesla0>

// 把readonly 視為額外屬性



// Array type example
type ArrayType = number[];
type ArrayLength = ArrayType['length']; // number

// Tuple type example
type TupleType = [number, string];
type TupleLength = TupleType['length']; // 2

// Readonly array type example
type ReadonlyArrayType = readonly number[];
type ReadonlyArrayLength = ReadonlyArrayType['length']; // number

// Readonly tuple type example
type ReadonlyTupleType = readonly [number, string];
type ReadonlyTupleLength = ReadonlyTupleType['length']; // 2

// GPT
type IsTuple<T> = 
  T extends readonly any[] 
    ? number extends T['length'] 
      ? false 
      : true 
  : false;

// Danny // empty tuple
type IsTuple2<T> = T extends readonly [infer P, ...infer R] ? true : false;
    
/// Basic tuples
type Test1 = IsTuple<[number, string]>;                 // true (tuple)
type Test2 = IsTuple<[number]>;                         // true (tuple)
type Test3 = IsTuple<[boolean, ...string[]]>;           // true (tuple with spread elements)
type Test4 = IsTuple<[]>;                               // true (empty tuple)
type Test5 = IsTuple<readonly [number, string]>;        // true (readonly tuple)
type Test6 = IsTuple<readonly [number]>;                // true (readonly tuple)
type Test7 = IsTuple<readonly [boolean, ...string[]]>;  // true (readonly tuple with spread elements)

// Arrays
type Test8 = IsTuple<number[]>;                         // false (array)
type Test9 = IsTuple<string[]>;                         // false (array)
type Test10 = IsTuple<readonly [number, ...string[]]>;  // false (readonly array with spread elements)
type Test11 = IsTuple<readonly string[]>;               // false (readonly array)

// Nested tuples
type Test12 = IsTuple<[number, [string, boolean]]>;     // true (nested tuple)
type Test13 = IsTuple<readonly [number, [string, boolean]]>; // true (readonly nested tuple)
type Test14 = IsTuple<[[number], [string]]>;            // true (tuple of tuples)
type Test15 = IsTuple<readonly [[number], [string]]>;   // true (readonly tuple of readonly tuples)

// Non-tuple types
type Test16 = IsTuple<number>;                          // false (number)
type Test17 = IsTuple<string>;                          // false (string)
type Test18 = IsTuple<boolean>;                         // false (boolean)
type Test19 = IsTuple<null>;                            // false (null)
type Test20 = IsTuple<undefined>;                       // false (undefined)
type Test21 = IsTuple<{}>;                              // false (object)
type Test22 = IsTuple<{ length: number }>;              // false (object with property)
type Test23 = IsTuple<Function>;                        // false (function)

// Complex types
type Test24 = IsTuple<[number, ...string[], boolean]>;   // true (tuple with spread elements)
type Test25 = IsTuple<readonly [number, ...string[], boolean]>;  // true (readonly tuple with spread elements)
type Test26 = IsTuple<[...number[]]>;                   // false (spread elements)
type Test27 = IsTuple<readonly [...number[]]>;          // false (readonly spread elements)

// Edge case: single-element tuple
type Test28 = IsTuple<[number]>;                        // true (single-element tuple)

// Edge case: single-element readonly tuple
type Test29 = IsTuple<readonly [number]>;               // true (single-element readonly tuple)

// Edge case: readonly empty tuple
type Test30 = IsTuple<readonly []>;                     // true (readonly empty tuple)

// Edge case: tuple with different types
type Test31 = IsTuple<[number, string, boolean]>;       // true (tuple with different types)

// Edge case: readonly tuple with different types
type Test32 = IsTuple<readonly [number, string, boolean]>;  // true (readonly tuple with different types)



type IsTuple3<T> = T extends readonly [infer P, ...infer R] ? true : false;

type Test133 = IsTuple<[number, string]>;       // true (tuple)
type Test2333 = IsTuple<number[]>;               // true (incorrectly evaluates to true)
type Test3333 = IsTuple<readonly number[]>;      // 
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla0 = ['tesla', 'model 3', 'model X', 'model Y'] as const 
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const 
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18/answer
  > View solutions: https://tsch.js.org/18/solutions
  > More Challenges: https://tsch.js.org
*/
