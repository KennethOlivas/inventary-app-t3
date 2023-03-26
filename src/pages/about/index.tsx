import TecInfo from "@/components/About/TecInfo";
import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <section className="mx-auto  px-6 py-8 ">
      <div className="container mx-auto px-6 py-10">
        <div className=" lg:flex lg:items-center">
          <Image
            className="h-96 w-full rounded-lg object-cover object-center lg:mx-6 lg:h-[36rem] lg:w-1/2"
            src="/images/Profile.jpg"
            alt=""
            width={1500}
            height={1500}
          />
          <div className="mt-8 lg:mt-0 lg:w-1/2 lg:px-6">
            <p className="text-5xl font-semibold text-blue-500 ">“</p>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:w-96 lg:text-3xl">
              About this web application
            </h1>
            <p className="mt-6 max-w-lg text-gray-500 dark:text-gray-400 ">
              This web application was created by: Kenneth A. Olivas Baldizón,
              with the purpose of completing my degree exam in the Computer
              Engineering career. I want to thank my tutor, my family and my
              friends for their support and guidance during this process. I hope
              that this application is useful and beneficial for the users and
              the society.
            </p>
            <div className="my-2 text-lg font-medium text-blue-500">
              <a href="https://github.com/KennethOlivas" target={"_blank"}>
                Kenneth Olivas
              </a>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              Full Stack Developer
            </p>
          </div>
        </div>
        <div>
          <h1 className="my-8  text-2xl font-semibold text-gray-800 dark:text-white lg:w-96 lg:text-3xl">
            Technologies used
          </h1>
          <TecInfo />
        </div>
      </div>
    </section>
  );
};

export default index;
