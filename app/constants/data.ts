import { Icons } from "../components/icons";

export type NavItem = {
  title: string;
  url: string;
  icon?: keyof typeof Icons;
  isActive: boolean;
  items: any;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    items: []
  },
  {
    title: 'About',
    url: '/about',
    icon: 'info',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: 'contact',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Search',
    url: '/search',
    icon: 'search',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Cart',
    url: '/cart',
    icon: 'cart',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Like',
    url: '/like',
    icon: 'heart',
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '/auth/login',
    icon: 'userLock',
    isActive: false,
    items: [] // No child items
  },

];