export interface SideBarItem {
  title: string;
  items: {
    id: string;
    title: string;
    notifications: number | boolean;
    href: string;
    icon?: string;
  }[];
}
export const sidebarItems: SideBarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        id: "0",
        title: "Dashboard",
        notifications: false,
        href: "/",
        icon: "Squares2X2Icon",
      },
      {
        id: "1",
        title: "Products",
        notifications: false,
        href: "/product",
        icon: "CubeIcon",
      },
      {
        id: "2",
        title: "Customers",
        notifications: false,
        href: "/customers",
        icon: "StarIcon",
      },
      {
        id: "3",
        title: "Orders",
        notifications: false,
        href: "/orders",
        icon: "TruckIcon",
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        id: "4",
        title: "Users",
        notifications: false,
        href: "/user",
        icon: "UsersIcon",
      },
      {
        id: "5",
        title: "Roles",
        notifications: false,
        href: "/roles",
        icon: "LockClosedIcon",
      },
    ],
  },
];

export const Admin: SideBarItem[] = [];
