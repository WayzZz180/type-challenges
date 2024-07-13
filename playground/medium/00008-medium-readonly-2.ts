/*
8 - Readonly 2
-------
by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

// type MyReadonly2<T, K> = any


/*  

有選的要readonly, 沒有的維持原樣, 完全沒給全部readonly

1. Pick 挑選 "要" readonly的，刪除(狀態維持不動的properties)
2. Omit 刪除 "被" readonly的，留下(狀態維持不動的properties)
以上達成互補

3. 沒給時... When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>` 
  也就是說沒有提供Ｋ時，當作Ｋ是全部的keyof T => set a default value for K that includes all keys of T

*/


// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T,K> & Readonly<Pick<T,K>>

type MyReadonly2<T, K extends keyof T = keyof T> = {  
  [P in keyof T as P extends K ? never : P]: T[P] 
} &
//  readonly [P in keyof T as P extends K ? P : never]: T[P];
//  針對上面這行，我們其實只需要`P extends K ? P`所以可以解化成...`[P in K]`，each key P in the union of keys K
{ readonly [P in K]: T[P] }






type MyReadonly3<T, K extends keyof T = keyof T> =
  {
    + readonly [P in K]: T[P]
  } & {

    [P in keyof T as P extends K? never: P] : T[P]
  }
  




type X = string extends string | number  ? 1 : 3
    //^?
type Z = string | number extends string ? 1 : 3
    //^?
    



  // Readonly<Pick<T, K>> & Omit<T, K>




interface Player {
  name: string,
  age: number,
  goals?: number
}

type Test = MyReadonly2<Player, 'name'>

const Player1: Test = {
  name: 'Ollie',
  age: 28,
  goals: 1
}

Player1.age = 5
Player1.goals = 54
Player1.name = '54'


/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly3<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly3<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly3<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly3<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
