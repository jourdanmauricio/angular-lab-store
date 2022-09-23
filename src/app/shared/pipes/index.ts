import { FilterCategoriesPipe } from './filter-categories.pipe';
import { OrderByPipe } from './order-by.pipe';
import { TradPipe } from './trad.pipe';
import { PrettyJsonPipe } from './pretty-json.pipe';
import { PrettyArrayPipe } from './pretty-array.pipe';

export const pipes: any[] = [
  FilterCategoriesPipe,
  OrderByPipe,
  TradPipe,
  PrettyJsonPipe,
  PrettyArrayPipe,
];

export * from './filter-categories.pipe';
export * from './order-by.pipe';
export * from './trad.pipe';
export * from './pretty-json.pipe';
export * from './pretty-array.pipe';
