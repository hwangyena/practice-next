const circle = {
  type: 'circle' as const,
  radius: 10,
};

const square = {
  type: 'square' as const,
  width: 10,
  height: 10,
};

type Shape = typeof circle | typeof square;

export function asConst(value: Shape) {
  switch (value.type) {
    case 'circle':
      return value.radius;
    case 'square':
      return value.width;
  }
}
