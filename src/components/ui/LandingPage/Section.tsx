import Image from "next/image"; // Adjust this import based on your actual Image component
import PlusSvg from "../../../../public/assets/svg/PlusSvg";
import { SectionProps } from "@/types";

const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="border border-white/[0.2] p-5 w-[95%]  mx-auto my-5 ">
      <div className="flex justify-between ">
        <PlusSvg className="relative -left-6 -top-6 " />
        <PlusSvg className="relative left-6 -top-6 " />
      </div>

      {children}
      <div className="flex justify-between ">
        <PlusSvg className="relative -left-6 top-6 " />
        <PlusSvg className="relative left-6 top-6 " />
      </div>
    </div>
  );
};

export default Section;
