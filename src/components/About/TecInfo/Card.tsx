import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  icon: ReactNode | ReactNode[];
  title: string;
  description: string;
  href: string;
};

const Card: FC<Props> = ({ description, href, icon, title }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="border-t3-purple-500/50hover:border-t3-purple-300/50 relative flex flex-col justify-between overflow-hidden rounded-md border bg-indigo-500/5 transition-colors"
    >
      <div className="flex items-center space-x-4 bg-indigo-500 p-2 pl-5 transition-colors hover:bg-indigo-500/70">
        {icon}
        <p className="text-t3-purple-200 text-lg font-medium leading-6 md:text-xl">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full rounded-md before:absolute before:inset-0 before:content-[''] hover:no-underline focus:no-underline active:no-underline"
          >
            {title}
          </a>
        </p>
      </div>
      <div className="text-t3-purple-100 m-6 text-sm subpixel-antialiased md:text-base">
        {description}
      </div>
    </motion.div>
  );
};

export default Card;
