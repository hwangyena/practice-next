export const a = 1;

type Person = {
  type: 'person';
  name: string;
};

type Animal = {
  type: 'animal';
  age: number;
};

declare const family: (Person | Animal)[];
const isPerson = (value: Person | Animal): value is Person => ((value as Person).name ? true : false);

if (family.every(isPerson)) {
  family[0].name;
}
