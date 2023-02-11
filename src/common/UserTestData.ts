export interface User {
  id: number;
  name: string;
  email: string;
  sesions: number;
}

export const UserData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    sesions: 1,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@gmail.com",
    sesions: 2,
  },
  {
    id: 3,
    name: "John Smith",
    email: "John@gmail.com",
    sesions: 3,
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "Jane@gmail.com",
    sesions: 4,
  },
  {
    id: 5,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    sesions: 5,
  },
];
