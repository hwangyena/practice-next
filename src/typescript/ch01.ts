interface Vector2D {
  x: number;
  y: number;
}

export function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// 구조적 타이핑
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

normalize({ x: 10, y: 20, z: 30 }); // z length가 없음에도 calculateLength에서 에러를 잡아내지 못함

// class type
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const testC: C = { foo: 'object literal' };
