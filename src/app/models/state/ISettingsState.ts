import { ISettings } from '@models/index';

type OrNull<T> = { [K in keyof T]: T[K] | null };

export type ISettingsState = OrNull<ISettings>;
