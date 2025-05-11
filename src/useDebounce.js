import { useState, useEffect, useRef } from "react";

export function useDebounce() {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedVal;
}

export function useThrottle(value, limit) {
  const [throttledVal, setThrottledVal] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledVal(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(timer);
    };
  }, [value, limit]);

  return throttledVal;
}

// promise.all polyfill

Promise.myAll = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = [];
    let total = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then((res) => {
          result[index] = res;
          total++;
          if (total === promises.length) resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

Promise.myAll([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// memoize

function myMemoize(fn) {
  const cache = {};

  return function (...args) {
    let argCache = JSON.stringify(args);

    if (!cache[argCache]) {
      cache[argCache] = fn.call(this, ...args);
    }

    return cache[argCache];
  };
}

const expensiveFunc = (num1, num2) => {
  let output = 1;
  for (let i = 0; i <= 10000000; i++) {
    output += i;
  }

  return num1 + num2 + output;
};

const memoizeFunc = myMemoize(expensiveFunc);

console.time();
console.log(memoizeFunc(1, 2));
console.timeEnd();

console.time();
console.log(memoizeFunc(1, 2));
console.timeEnd();
