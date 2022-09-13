import { DefaultOptions } from 'react-query';

export const nev: never = 12; // Error!

// 유닛, 리터럴 타입
type A = 'A';
type Twelve = 12;

// 유니온(union) 타입
type AB = 'A' | 'B';

// 1. intersection (교집합)
interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}

type PersonSpan = Person & Lifespan;
const person: PersonSpan = { birth: new Date(), name: 'Jina' };

// 2. Union (합집합)
type T = Person | Lifespan;
const t: T = { birth: new Date(), name: 'hey' };

type K = keyof (Person | Lifespan); // === keyof Person & keyof Lifespan === never
type K2 = keyof (Person & Lifespan); // === keyof Person | keyof Lifespan === 'name', 'birth'

const test: K2 = 'birth';

// TEST
interface Line {
  width: number;
}

interface Rect {
  width: number;
  height: number;
}

type Shape = Line & Rect;
type Shape2 = Line | Rect;

const s1: Shape = { width: 12, height: 13 }; // height가 없으면 에러
const s2: Shape2 = { width: 12 };

const k1: keyof Shape = 'height'; // width 또는 height
const k2: keyof Shape2 = 'width'; // 동일한 키만 찾는다

// 3. extends
interface Vector1D {
  x: number;
}
interface Vector2D extends Vector1D {
  y: number;
}
interface Vector3D extends Vector2D {
  z: number;
}
const v: Vector3D = { x: 1, y: 2, z: 3 };

const list = [1, 2];
const tuple: [number, number] = list; // Error: number[]를 [number,number]에 할당할 수 없음

const list2: [number, number] = [1, 2];
const tuple2: number[] = list2; // OK!

const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;

//
type E = Exclude<string | Date, string | number>;

//// ITEM 08 ////

// interface Person { // type
//   weight: number;
//   height: number;
// }
declare function Person(weight: number, height: number): void; //값

// typeof
class Cylinder {
  radius = 1;
  height = 1;
}

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius; // 타입추론 가능
  }
}

const val = typeof Cylinder; // 값이 function

type t1 = Cylinder; // 타입이 typeof Cyliender
const v1: t1 = { height: 1, radius: 2 };

type t2 = typeof Cylinder; // 타입이 typeof Cyliender -> new ~ 의 생성자 함수 타입을 가진다
declare let fn: t2;
const v2 = new fn(); // 이렇게 사용할 수 있다

type C = InstanceType<typeof Cylinder>; // C->Cylinder
const v3: C = new fn();

type Content = 'content'; // 문자열 리터럴 타입 -> 'content'
const content = 'content'; // 문자열 리터럴 값 -> string

//// ITEM 9 ////

interface Person {
  name: string;
}

const lisa: Person = { name: 'lisa' }; //타입 선언
const bob = { name: 'Bob' } as Person; // 타입 단언

const people1 = ['alice', 'bob', 'lisa'].map((name) => ({ name } as Person));
const people2: Person[] = ['alice', 'bob', 'lisa'].map((name) => ({ name })); //Best Practice!!

const el = document.getElementById('foo')!; //타입은 HTMLElement

const element = document.body as Person; // ERROR!
const element = document.body as unknown as Person; // OK but Dangerous

//// ITEM 10 ////

// 속성접근자
type Tuple = [string, number, Date];
type TupleEl = Tuple[number]; // string | number | Date

// 객체 wrapper 타입
const str: String = 'abc';
['abc', 'def'].includes(str); // ERROR! (String은 Object)

//// ITEM 11 ////

// 1. 잉여 속성 체크
interface Room {
  numDoors: number;
  cellingHeightFt: number;
}
const r: Room = {
  cellingHeightFt: 123,
  numDoors: 1,
  elephant: 22, // ERROR!
};

// 2. 구조적 타이핑
const roomObj = {
  cellingHeightFt: 123,
  numDoors: 1,
  elephant: 22,
};
const r2: Room = roomObj; // OK

interface Options {
  title: string;
  darkMode?: boolean;
}

const o1: Options = document; // document가 title 속성을 가짐
const o2: Options = new HTMLAnchorElement(); // document가 title 속성을 가짐

const intermediate = { lightMode: true, title: 'Ski Free' }; //객체리터럴
const o: Options = intermediate; // 잉여속성체크를 건너뜀

interface DefalutOptionsOfBrowser {
  darkMode: boolean;
  [otherOption: string]: unknown; // 인덱스 시그니처
}
const chrome: DefalutOptionsOfBrowser = { darkMode: true }; //OK

interface TestA {
  a?: boolean;
}
const a1 = { a: false };
const realA: TestA = a1;

// 약한 타입 - 공통 속성 체크
interface LineOptions {
  logScale?: boolean;
  invertedYAxis?: boolean;
}

const opts = { invertedyAxis: false };
const optsTest: LineOptions = opts; // ERROR: y 오타 확인

// // 함수 문장과 함수 표현식
// function rollDice1(side: number): number {
//   return side;
// } // 함수 문장
// const rollDice2 = (side: number): number => side; // 함수 표현식
// const rollDice3 = function (side: number): number {
//   return side;
// }; // 함수 표현식

// type RollDiceFunctionType = (side: number) => number;
// const rollDice4: RollDiceFunctionType = (side) => {
//   return side;
// };

// // type vs interface
// // 공통점
// type TFnWithProp = {
//   (x: number): number;
//   prop: string;
// };
// interface IFnWithProp {
//   (x: number): number;
//   prop: string;
// }
// const testFunction = (p: TFnWithProp) => {
//   const num = p(1);
//   return p.prop;
// };

// type Age = { age: number };
// type TPerson = Age & { name: string };
// interface IPerson extends Age {
//   name: string;
// }

// class TBrother implements TPerson {
//   name = '동생';
//   age = 12;
// }
// class IBrother implements IPerson {
//   name = '동생';
//   age = 13;
// }

// // 차이점
// // 1. type => union을 가짐 -> 복잡한 타입 확장 가능
// type AorB = 'A' | 'B';

// // 2. type => 튜플, 배열 간결하게 표현가능
// type Pair = [number, number];
// type StringList = string[];
// type NamedNums = [string, ...number[]];
// const numbers: NamedNums = ['', 1, 2, 3];

// // 3. interface => 보강 가능 ::: [선언 병합] 이라고 함
// interface IState {
//   name: string;
//   capital: string;
// }
// interface IState {
//   popultation: number;
// }
// const wyoming: IState = {
//   name: 'Wyoming',
//   capital: 'Cheyenne',
//   popultation: 500_000,
// };

// // 타입 연산과 제너릭 사용으로 반복 줄이기
// interface Name {
//   first: string;
//   last: string;
// }
// type DancingDuo<T extends Name> = [T, T];

// const couple: DancingDuo<{ first: string }> = [
//   { first: 'h', last: 'la' },
//   { first: 'w', last: 'laa' },
// ];

// // pick 만들기
// type MyPick<T, K extends keyof T> = { [k in K]: T[K] };

// // partial
// const house = {
//   isBig: true,
//   roomCount: 5,
// };
// type House = Partial<typeof house>; // as const로 선언된 변수는 아예 같은 값을 가리킴..!

// const house2: House = {
//   isBig: false,
//   roomCount: 10,
// };
