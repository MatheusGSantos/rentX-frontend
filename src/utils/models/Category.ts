import { ReactComponent as TearDrop } from 'assets/icons/tear-drop.svg';
import { ReactComponent as Thunder } from 'assets/icons/thunder.svg';
import { ReactComponent as Leaf } from 'assets/icons/leaf.svg';

export type CategoryName = 'gas' | 'electric' | 'alcohol';

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  createdAt: string;
};

export const CATEGORY_ICONS = {
  alcohol: Leaf,
  electric: Thunder,
  gas: TearDrop,
};
