import type { TCollection } from './TCollection';

export type TCollectionRequest = Omit<TCollection, 'id'>;