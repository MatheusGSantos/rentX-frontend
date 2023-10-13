import { ReactComponent as TearDrop } from 'assets/icons/tear-drop.svg';
import { ReactComponent as Thunder } from 'assets/icons/thunder.svg';
import { ReactComponent as Leaf } from 'assets/icons/leaf.svg';

export type CategoryName = 'gas' | 'electric' | 'alcohol';

export type Category = {
  id: string;
  name: CategoryName;
  icon: string;
  description: string;
  displayName: string;
  createdAt: string;
};

export const CATEGORY_ICONS: Record<
  CategoryName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  alcohol: Leaf,
  electric: Thunder,
  gas: TearDrop,
};
