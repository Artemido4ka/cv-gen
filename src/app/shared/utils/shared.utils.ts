import { IBasicObjectItem } from '../types/core.type';

export const formatObjectToString = (item: IBasicObjectItem[]) => {
  return item.map(i => i.name);
};
