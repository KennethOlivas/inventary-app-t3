export interface SideBarItem {
  id: string;
  title: string;
  notifications: number | boolean;
  href: string;
}
export const sidebarItems: SideBarItem[] = [
  { id: "0", title: "Dashboard", notifications: false, href: "/" },
  { id: "1", title: "Products", notifications: false, href: "/product" },
  { id: "2", title: "Customers", notifications: false, href: "/customers" },
  { id: "3", title: "Inventary", notifications: 6, href: "/inventary" },
  { id: "4", title: "Users", notifications: false, href: "/user" },
];
