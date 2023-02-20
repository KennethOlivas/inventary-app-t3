import { FC, ReactNode } from "react";

type HeaderTitleProps = {
  children?: ReactNode;
  title: string;
};

const HeaderTitle: FC<HeaderTitleProps> = ({ children, title}) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold text-gray-200">{title}</h1>
      {children}
    </div>
  );
};

export default HeaderTitle;
