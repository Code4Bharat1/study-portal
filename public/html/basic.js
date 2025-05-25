import {
  FaRegFileAlt,
  FaHeading,
  FaParagraph,
  FaLink,
  FaImage,
  FaListUl,
  FaTable,
  FaCheckSquare,
  FaCode,
  FaHtml5,
} from "react-icons/fa";

const htmlPracticeMenu = [
  {
    label: "1. Basic Page",
    icon: <FaRegFileAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/1"),
  },
  {
    label: "2. Headings",
    icon: <FaHeading className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/2"),
  },
  {
    label: "3. Paragraphs",
    icon: <FaParagraph className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/3"),
  },
  {
    label: "4. Links",
    icon: <FaLink className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/4"),
  },
  {
    label: "5. Images",
    icon: <FaImage className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/5"),
  },
  {
    label: "6. Lists",
    icon: <FaListUl className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/6"),
  },
  {
    label: "7. Tables",
    icon: <FaTable className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/7"),
  },
  {
    label: "8. Forms",
    icon: <FaCheckSquare className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/8"),
  },
  {
    label: "9. Comments",
    icon: <FaCode className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/9"),
  },
  {
    label: "10. Boilerplate",
    icon: <FaHtml5 className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("basic/10"),
  },
];

export default htmlPracticeMenu;
