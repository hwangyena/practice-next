export const a = 1;

type TestHook<T> = {
  test: (args: T[]) => void;
  name: T;
};

declare function testHooks<T>(): TestHook<T>;
declare function test2Hooks(): { a: string; b: number };
// ... 위 두 개 이상의 함수가 아래 container에 들어가서 동작합니다.

const container = <T extends Record<string, unknown>>(callback: <K>() => T) => {
  const context: T | null = null;

  const useCallback = <K>() => {
    return callback<K>(); // 어떻게 넣어도 unknown이 나오는 매직
  };

  return { context, useCallback };
};

const useTest = container(testHooks).useCallback<string>(); //test와 name의 T가 unknown으로 인식됨

// useTest의 제네릭이 동작하게하려면 어떻게 하면될까요..??
