import { Variation } from '@models/index';

/**
 * Generate next Sku for variations
 * @param variations
 * @returns sku: string
 */
export function newVarSku(variations: Variation[]) {
  let sku = 1;
  if (variations.length > 0) {
    let max = 1;
    variations.forEach((variation) => {
      let varSku = variation.attributes?.find(
        (atrib) => atrib.id === 'SELLER_SKU'
      );
      if (varSku) {
        let varSku2 = varSku.value_name?.split('--');
        if (varSku2!.length > 1) {
          let varSku3 = parseInt(varSku2![1]) + 1;
          if (varSku3 > max) {
            max = varSku3;
            sku = max;
          }
        }
      }
    });
  }
  return sku;
}

/**
 * Compare objects
 * @param o1
 * @param o2
 * @returns boolean
 */
export const objectsEqual: any = (o1: any, o2: any) =>
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

/**
 * Compare arrays
 * @param a1
 * @param a2
 * @returns boolean
 */
export const arraysEqual = (a1: any, a2: any) =>
  a1.length === a2.length &&
  a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]));

/**
 * Check if new variation
 * @param newVar
 * @param variations
 * @returns boolean
 */
export const isNewVariation = (newVar: Variation, variations: Variation[]) => {
  let found = false;
  for (let i = 0; i < variations.length; i++) {
    found = arraysEqual(newVar, variations[i]);
    if (found === true) break;
  }
  return found;
};

const f = (a: any, b: any) =>
  [].concat(...a.map((d: any) => b.map((e: any) => [].concat(d, e))));

/**
 * Executes a cartesian product between elements of arrays
 * @param a
 * @param b
 * @param c
 * @returns
 */
export const cartesian: any = (a: any, b: any, ...c: any) =>
  b ? cartesian(f(a, b), ...c) : a;
