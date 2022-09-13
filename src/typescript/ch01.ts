// ITEM 01
type Person = {
  name: string;
  age: number;
};

const person1: Person = {
  nome: 'yena', //ERROR: 'nome' does not exist in type 'Person'
  age: 12,
};

const names = ['Alice', 'Bob'];
console.log(names[5].toUpperCase()); //Runtime Error!

// ITEM 02
const nullcheck: number = null; // strictNullChecks 해제시 유효한 코드

// ITEM 03
// type Square = {
//   kind: 'square';
//   width: number;
// };
// type Rectangle = {
//   kind: 'rectangle';
//   width: number;
//   height: number;
// };
// type Shape = Square | Rectangle;

// function calculateArea(shape: Shape) {
//   if (shape.kind === 'rectangle') { // tagged union
//     return shape.width * shape.height;
//   }
// }

class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle; // 타입으로 참조

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // 값으로 참조
    return shape.width * shape.height;
  }
}

// Item 04
interface Vector2D {
  x: number;
  y: number;
}

export function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
interface NameVector {
  name: string;
  x: number;
  y: number;
}

const value: NameVector = { name: 'test', x: 10, y: 10 };
calculateLength(value);

// 구조적 타이핑의 문제
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function normalize(v: Vector3D) {
  const length = calculateLength(v);

  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}

// z length가 없음에도 calculateLength에서 에러를 잡아내지 못함
normalize({ x: 10, y: 20, z: 30 });

// class type
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const testC: C = { foo: 'object literal' };

interface Author {
  first: string;
  last: string;
}

interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map((row) => ({ first: row[0], last: row[1] }));
}

// ITEM 05
declare function calculateAge(birthDate: Date): number;

const myBirth: any = '1998-08-17';
calculateAge(myBirth); // not Error
