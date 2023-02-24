import type { FC } from "react";
import React from "react";

type Props = {
  onCancel: () => void;
};

const ActionsButtons: FC<Props> = ({ onCancel }) => {
  return (
    <div className="spacex-4 flex justify-evenly space-x-4">
      <button
        type="button"
        className="w-full rounded-md bg-pink-600 px-4 py-2 text-white/90 shadow-lg shadow-pink-600/40 transition-all duration-200 hover:bg-pink-500 hover:text-white"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white/90 shadow-lg shadow-indigo-600/40 transition-all duration-200 hover:bg-indigo-500 hover:text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default ActionsButtons;
