/**
Marks every field in an object (deep or shallow) as optional
@example
```ts
type CokeFormula = {
  sodaWater: {
    co2: number,
    water: number
  },
  sugar: number
}

const CokeFormulaFactory = (overrides = {} as RecursivePartial<CokeFormula>): CokeFormula => {
  const defaults: CokeFormula = {
    sodaWater: {
      co2: 10,
      water: 40
    },
    sugar: 50
  }

  return {
    ...defaults,
    ...overrides,
    sodaWater: {
      ...defaults.sodaWater,
      ...overrides?.sodaWater
    }
  }
}

CokeFormulaFactory();
// {
//    sodaWater: {
//      co2: 10,
//      water: 40
//    },
//    sugar: 50
// }

CokeFormulaFactory({ soda })
// Argument of type '{ soda: any; }' is not assignable to
// parameter of type 'RecursivePartial<CokeFormula>'. Object
// literal may only specify known properties, and 'soda' does
// not exist in type 'RecursivePartial<CokeFormula>'.ts(2345)

CokeFormulaFactory({ sodaWater: { water: "40" } })
// Type 'string' is not assignable to type 'number | undefined'.ts(2322)

CokeFormulaFactory({ sodaWater: { water: 35 } })
// {
//    sodaWater: {
//      co2: 10,
//      water: 35
//    },
//    sugar: 50
// }
```
@category Utilities
*/
  
type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends {} ? RecursivePartial<T[P]> : T[P];
};
