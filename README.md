# Inventory Control

This is an inventory control project developed using Next.js, TypeScript, Tailwind CSS, Trpc, and Prisma. It provides a web interface for managing and tracking inventories.

## Features

- User registration and authentication
- Product and category management
- Stock level tracking
- Inventory reports and analytics

## Technologies Used

- Next.js: A React framework for building server-side rendered and static websites.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.
- Trpc: A typesafe RPC (Remote Procedure Call) framework for TypeScript.
- Prisma: A modern database toolkit for Node.js and TypeScript.
- Docker: A containerization platform for packaging applications and their dependencies.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-project.git`
2. Install the dependencies: `npm install`
3. Set up the database connection in the Prisma configuration file.
4. Start the PostgreSQL database using Docker: `docker run --name inventory-db -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`
5. Run database migrations: `npx prisma migrate dev`
6. Start the development server: `npm run dev`
7. Open the application in your browser: `http://localhost:3000`

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Trpc Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com/)
