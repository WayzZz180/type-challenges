/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in

  ### Question

  Implement the built-in `Pick<T, K>` generic without using it.

  Constructs a type by picking the set of properties `K` from `T`

  For example:

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/4
*/

/* _____________ Your Code Here _____________ */

// type MyPick<T, K> = any


type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}



// 關於keyof
type Player = {
  name: string,
  age: number
}

type Test = keyof Player
  // ^?
// type Test = "name" | "age"; 會長這樣

const playerKey: Test = "name"; // valid
const anotherPlayerKey: Test = "age"; // valid
const invalidPlayerKey: Test = "height" // Error: Type '"height"' is not assignable to type 'Test'.


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

type ABC = MyPick<Todo, 'title' | 'completed'>
interface StringArray {
  [index: number]: string;
}
const testsss: StringArray = {
  0 : 'true',
  99 : 'true',
  
}
const abc = testsss[15]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/
