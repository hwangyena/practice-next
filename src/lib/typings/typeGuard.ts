type Fish = {
  swim: boolean;
};

type Bird = {
  fly: boolean;
};

export function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

export const nimo: Fish = { swim: true };
