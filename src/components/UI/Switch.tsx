import { Switch as HeadlesSwitch } from "@headlessui/react";
import type { FC } from "react";

type Porps = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};
const Switch: FC<Porps> = ({ enabled, setEnabled }) => {
  return (
    <>
      <HeadlesSwitch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-indigo-500" : "bg-indigo-900/50"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out `}
      >
        <>
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              enabled
                ? "translate-x-9 bg-white"
                : "translate-x-0 bg-neutral-200"
            }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </>
      </HeadlesSwitch>
    </>
  );
};

export default Switch;
