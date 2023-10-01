import { ReactComponent as HomeIcon } from '@assets/icons/house.svg';
import { ReactComponent as CarIcon } from '@assets/icons/car.svg';
import { ReactComponent as CalendarIcon } from '@assets/icons/calendar.svg';
import { ReactComponent as UserIcon } from '@assets/icons/user.svg';

export const TABS = [
  {
    path: '/',
    label: 'home page',
    icon: HomeIcon,
  },
  {
    path: '/cars',
    label: 'available cars page',
    icon: CarIcon,
  },
  {
    path: '/rentals',
    label: 'user rentals page',
    icon: CalendarIcon,
  },
  {
    path: '/profile',
    label: 'user profile page',
    icon: UserIcon,
  },
];
