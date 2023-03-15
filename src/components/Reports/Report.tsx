import useModal from "@/hooks/modalState";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import Modal from "../UI/Modal/Index";

type ReportProps = {
  onClick: (startDate: Date, endDate: Date) => void;
};

const Report: FC<ReportProps> = ({ onClick }) => {
  const { isShowing, toggle } = useModal();
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleClick = (): void => {
    onClick(
      new Date(value?.startDate as Date),
      new Date(value?.endDate as Date)
    );
  };

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <div>
      <button
        className="flex rounded-md bg-emerald-600 px-4 py-2 text-white/90 shadow-lg shadow-emerald-600/40 transition-all duration-200 hover:bg-emerald-500 hover:text-white"
        onClick={toggle}
      >
        Export to CSV
        <DocumentArrowDownIcon className="ml-2 h-6 w-6" />
      </button>
      <Modal onClose={toggle} state={isShowing}>
        <section className="h-[500px] w-[735px] ">
          <Datepicker
            primaryColor="violet"
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
            showFooter={true}
          />
        </section>
        <button
          className="flex rounded-md bg-emerald-600 px-4 py-2 text-white/90 shadow-lg shadow-emerald-600/40 transition-all duration-200 hover:bg-emerald-500 hover:text-white"
          onClick={handleClick}
        >
          Export to CSV
          <DocumentArrowDownIcon className="ml-2 h-6 w-6" />
        </button>
      </Modal>
    </div>
  );
};

export default Report;
