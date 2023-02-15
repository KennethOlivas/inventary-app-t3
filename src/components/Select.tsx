import { FC, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SelectProps {
  options: string[] | number[];
  value: string | number;
  onChange: (value: string | number) => void;
}
const Select: FC<SelectProps> = ({ onChange, options, value }) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (value: string | number) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className=" top-16 w-72">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-default rounded-lg bg-indigo-600 py-2
          pl-3 pr-10 text-left shadow-md transition-all duration-150 hover:bg-indigo-500 hover:shadow-md"
          >
            <span className="block truncate text-white">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-white/90"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform translate-y-4 opacity-0"
            enterTo="transform scale-100 translate-y-0 opacity-100"
            leave="transition duration-200 ease-out translate-y-0"
            leaveFrom="transform scale-100  translate-y-0 opacity-100"
            leaveTo="transform  translate-y-4 opacity-0"
            as={Fragment}
          >
            <Listbox.Options className="absolute bottom-full mb-2 max-h-60 w-full overflow-auto rounded-md  bg-[#171717] py-1 text-base text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((item, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-600 text-gray-100" : "text-white"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
