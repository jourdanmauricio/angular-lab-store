import { Category, Variation } from '@models/index';
import { IAttribComb } from '@models/ui/IAttribComb.model';

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

/**
 * get the list of different attributes that are part of the combination in variations or in the category with allow_variations
 * @param variations variations product
 * @param category Categoría del producto
 * @returns list of attributes
 */
export function getAttribsComb(variations: Variation[], category: Category) {
  let attribs: IAttribComb[] = [];
  console.log('calc atrib');

  let attribsVarCat = category?.attributes
    .filter((attribute) => attribute.tags?.hasOwnProperty('allow_variations'))
    .map(
      (el) =>
        ({
          id: el.id,
          name: el.name,
          source: 'category',
          active: false,
          values: el.values,
        } as IAttribComb)
    );

  if (variations.length > 0) {
    variations[0].attribute_combinations.forEach((atrib) => {
      let atribComb: IAttribComb;
      let found = attribsVarCat.find((cat) => cat.id === atrib.id);
      if (found) {
        atribComb = {
          id: atrib.id ? atrib.id : atrib.name.toUpperCase(),
          name: atrib.name,
          active: true,
          source: 'product',
          values: found.values,
        };
      } else {
        atribComb = {
          id: atrib.id ? atrib.id : atrib.name.toUpperCase(),
          name: atrib.name,
          active: true,
          source: 'custom',
        };
      }
      attribs.push(atribComb);
    });
  }

  attribsVarCat.forEach((cat) => {
    let index = attribs.findIndex((prod) => prod.id === cat.id);
    if (index === -1) {
      if (variations.length === 0) cat.active = true;
      attribs.push(cat);
    }
  });

  console.log('attributes', attribs);
  return attribs;
}
