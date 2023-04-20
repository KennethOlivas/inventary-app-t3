// backup
import { enforceUserIsAdmin, publicProcedure } from "@/server/api/trpc";
import { exec } from "child_process";
import fs from "fs";

export const backup = publicProcedure.use(enforceUserIsAdmin).query(() => {
  return new Promise<string>((resolve, reject) => {
    exec(
      "docker exec -t postgres pg_dumpall -c -U postgres > backup.sql",
      (error) => {
        if (error) {
          // Si hay un error, rechazar la promesa
          reject(error);
        } else {
          // Si no hay error, leer el archivo backup.sql

          fs.readFile("backup.sql", "utf8", (err, data) => {
            if (err) {
              // Si hay un error al leer el archivo, rechazar la promesa
              reject(err);
            } else {
              // Si no hay error al leer el archivo, resolver la promesa con el contenido del archivo
              resolve(data);
            }
          });
        }
      }
    );
  });
});
