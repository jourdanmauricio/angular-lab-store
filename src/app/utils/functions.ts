import {
  ICategory,
  IProductDto,
  IProductMl,
  IVariation,
  IVariationUpdDto,
} from '@models/index';
import { IAttribComb } from '@models/ui/IAttribComb.model';

/**
 * Generate next Sku for variations
 * @param variations
 * @returns sku: string
 */
export function newVarSku(variations: IVariation[]) {
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
export const isNewVariation = (
  newVar: IVariation,
  variations: IVariation[]
) => {
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
export function getAttribsComb(variations: IVariation[], category: ICategory) {
  let attribs: IAttribComb[] = [];

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
  return attribs;
}

export function removeDuplicates(arr: any[]) {
  return [...new Set(arr)];
}

export function getQuantityFromVariations(variations: IVariation[]): number {
  return variations.reduce(
    (acumulador, actual) => acumulador + actual.available_quantity,
    0
  );
}

export function handleBodyLocalMlWeb(
  currentProd: IProductDto,
  updatedProd: string[]
) {
  let bodyMl: any = {};
  let bodyMlDescription: any = {};
  let body: any = {};
  updatedProd.forEach((field) => {
    switch (field) {
      case 'available_quantity':
        body.available_quantity = currentProd.available_quantity;
        break;
      case 'attributes':
        let attributes = currentProd.attributes.map((attrib) => {
          return attrib.updated === true
            ? {
                id: attrib.id,
                name: attrib.name,
                value_id: attrib.tags?.hasOwnProperty('multivalued')
                  ? null
                  : attrib.value_id,
                value_name: attrib.value_name,
              }
            : { id: attrib.id };
        });
        bodyMl.attributes = attributes;
        break;
      case 'condition':
        bodyMl.condition = currentProd.condition;
        break;
      case 'description':
        bodyMlDescription.plain_text = currentProd.description;
        break;
      case 'pictures':
        bodyMl.pictures = currentProd.pictures.map((pic) => ({
          id: pic.id,
        }));
        break;
      case 'price':
        body.price = currentProd.price;
        break;
      case 'sale_terms':
        bodyMl.sale_terms = currentProd.sale_terms;
        break;
      case 'seller_custom_field':
        bodyMl.seller_custom_field = currentProd.seller_custom_field;
        break;
      case 'status':
        body.status = currentProd.status;
        break;
      case 'title':
        bodyMl.title = currentProd.title;
        break;
      case 'variations':
        console.log('variations', currentProd.variations);
        let variations: IVariationUpdDto[] = [];
        let pictures: { id: string }[] = [];
        currentProd.variations.forEach((variation) => {
          variation.picture_ids.forEach((picture) => {
            if (pictures.findIndex((pic) => pic.id === picture) === -1)
              pictures.push({ id: picture });
          });

          let obj = {} as IVariationUpdDto;
          if (variation.updated === true) {
            obj = {
              attribute_combinations: variation.attribute_combinations,
              attributes: variation.attributes,
              picture_ids: variation.picture_ids,
            };
            // Upd
            if (typeof variation.id === 'number') {
              obj.id = variation.id;
            } else {
              // New
              obj.available_quantity = variation.available_quantity;
              obj.price = variation.price;
            }
          } else {
            obj = { id: variation.id };
          }
          variations.push(obj);
        });
        bodyMl.variations = variations;
        bodyMl.pictures = pictures;
        break;
      case 'video_id':
        bodyMl.video_id = currentProd.video_id;
        break;
    }
  });
  return { bodyMl, bodyMlDescription, body };
}

export function handleBodyMl(prodMl: IProductMl, updatedProdMl: string[]) {
  let bodyMl: any = {};
  let variations: IVariationUpdDto[] = prodMl.variations.map((vari) => ({
    id: vari.id,
    price: vari.price,
    available_quantity: vari.available_quantity,
  }));
  updatedProdMl.forEach((field) => {
    switch (field) {
      case 'available_quantity':
        if (prodMl.variations.length === 0) {
          bodyMl.available_quantity = prodMl.available_quantity;
        } else {
          bodyMl.variations = variations;
        }
        break;
      case 'status':
        bodyMl.status = prodMl.status;
        break;
      case 'price':
        if (prodMl.variations.length === 0) {
          bodyMl.price = prodMl.price;
        } else {
          bodyMl.variations = variations;
        }
        break;
    }
  });
  return bodyMl;
}
