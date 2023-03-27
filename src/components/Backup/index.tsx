import { api } from "@/utils/api";
import React from "react";

const Backup = () => {
  const { data: databaseSize } = api.database.databaseSize.useQuery();
  const { data: backup } = api.database.backup.useQuery();
  const databaseSizeString = JSON.stringify(databaseSize) || "";
  const databaseSizeString2 = databaseSizeString.match(/(\d+)/g)?.toString();
  console.log(backup);

  const backupHandler = () => {
    // create sql file and download it the data is in backup and it is a string
    if (backup) {
      const element = document.createElement("a");
      const file = new Blob([backup], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "backup.sql";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  return (
    <>
      <div className="w-full py-10 ">
        <div className="container mx-auto flex items-start justify-center px-6">
          <div className="w-full">
            {/* Card is full width. Use in 12 col grid for best view. */}
            {/* Card code block start */}
            <div className="mx-auto w-full rounded bg-white p-5 shadow dark:bg-neutral-900 lg:p-10">
              <div className="mb-8 flex flex-col items-start lg:flex-row lg:items-center">
                <h1 className="mr-12 text-xl font-bold text-gray-800 dark:text-gray-100 lg:w-1/2 lg:text-2xl">
                  Back up your data
                </h1>
                <div className="flex flex-col items-start md:flex-row md:items-center">
                  <div className="mt-4 mr-0 flex w-48 justify-center rounded bg-indigo-100 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-600 lg:mt-0 xl:mr-8">
                    Date: {new Date().toDateString()}
                  </div>
                  <button
                    onClick={backupHandler}
                    className="mt-4 mr-0 flex w-48 justify-center rounded bg-emerald-100 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-600 lg:mt-0 xl:mr-8"
                  >
                    Backup
                  </button>
                  <button className="mt-4 mr-0 flex w-48 justify-center rounded bg-amber-100 py-2 text-sm font-medium text-amber-700 dark:text-amber-600 lg:mt-0 xl:mr-8">
                    Restore
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start lg:flex-row lg:items-center">
                <div className="w-full pr-0 lg:w-1/2 lg:pr-48">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded">
                      <img
                        className="h-full w-full overflow-hidden rounded object-cover object-center"
                        src=""
                        alt="logo"
                      />
                    </div>

                    <div className="ml-2">
                      <h5 className="text-base font-medium text-gray-800 dark:text-gray-100">
                        Company Name
                      </h5>
                      <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                        Chinandega, Nicaragua
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm font-normal text-gray-600 dark:text-gray-400">
                    Inventary management system for small and medium businesses.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start lg:w-1/2 lg:flex-row lg:items-center lg:pl-8">
                  <div className="mr-12 mt-5 flex items-center lg:mr-6 lg:mt-0 lg:block xl:mr-12">
                    <h2 className="mb-1 text-xl font-bold leading-6 text-gray-600 dark:text-gray-400 lg:text-center lg:text-2xl">
                      {databaseSizeString2} MB
                    </h2>
                    <p className="ml-2 text-center text-xl leading-5 text-gray-800 dark:text-gray-100 lg:ml-0">
                      Data base size
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Card code block end */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Backup;
