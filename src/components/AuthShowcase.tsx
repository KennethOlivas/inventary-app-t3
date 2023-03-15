import { api } from "@/utils/api";
import type { FormikHelpers } from "formik";
import { Form, Formik } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import TextField from "./Inputs/TextField";

const AuthShowcase: FC = () => {
  const { data: sessionData } = useSession();
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch } = api.keyRouter.validateKey.useQuery({
    key: key,
  });

  const inicialValues = {
    key: "",
  };

  useEffect(() => {
    if (data) {
      signIn();
      setIsLoading(false);
    }

    if (data === false) {
      setError(true);
      setIsLoading(false);
    }
  }, [data]);
  console.log(data);

  const onSubmit = async (
    values: typeof inicialValues,
    formikHelpers: FormikHelpers<typeof inicialValues>
  ) => {
    setKey(values.key);
    await refetch();

    formikHelpers.resetForm();
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {sessionData ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg border-2 p-12">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <h3 className="mt-3 text-center text-3xl font-medium text-white">
              Welcome
            </h3>

            <p className="mt-1 text-center text-2xl text-white">Login</p>
            <Formik initialValues={inicialValues} onSubmit={onSubmit}>
              <Form>
                <div className="mt-4 w-full">
                  <TextField
                    name="key"
                    type="textarea"
                    placeholder="key"
                    id="key"
                  />
                </div>
                {error && (
                  <div className="mt-2 text-sm text-red-500">
                    invalid key, try again
                  </div>
                )}

                <div className="mt-4 flex items-center justify-center">
                  <button
                    type="submit"
                    className="flex transform rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    {isLoading && (
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    )}
                    {isLoading ? "Validating" : "Validate"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthShowcase;
