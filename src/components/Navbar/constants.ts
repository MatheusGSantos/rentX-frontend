import { ReactComponent as HomeIcon } from '@assets/house.svg';
import { ReactComponent as CarIcon } from '@assets/car.svg';
import { ReactComponent as CalendarIcon } from '@assets/calendar.svg';
import { ReactComponent as UserIcon } from '@assets/user.svg';

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
