type A = any[]
type B = string[]
type C = string | number[]
type D = string []

type T1 = B extends A ? true : false
type T2 = C extends A ? true : false

type T3 = A extends B ? true : false
type T4 = C extends B ? true : false

type T5 = A extends C ? true : false
type T6 = B extends C ? true : false



type S1 = A extends infer X ? X : false
type S2 = B extends infer X ? X : false
type S3 = C extends infer X ? X : false



// https://ithelp.ithome.com.tw/articles/10223315







// function myFun(a:string, b:string, ...manyMoreArgs:number[]) {
// function myFun(a, b, ...manyMoreArgs) {
function myFun<T extends string[]>(a, b, ...manyMoreArgs:T ) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");

// Console Output:
// a, one
// b, two
// manyMoreArgs, ["three", "four", "five", "six"]