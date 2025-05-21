import {
  FaCode,
  FaCheckSquare,
  FaVolumeUp,
  FaBars,
  FaSearch,
  FaUniversalAccess,
  FaWindowMaximize,
  FaList,
  FaImage,
  FaShieldAlt,
} from "react-icons/fa";

const pythonPracticeMenu = [
  
  {
      label: "1. Multithreading with threading",
      icon: <FaCode className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/1/multithreading"),
    },
    {
      label: "2. Multiprocessing with multiprocessing",
      icon: <FaCheckSquare className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/2/multiprocessing"),
    },
    {
      label: "3. AsyncIO for Asynchronous Programming",
      icon: <FaVolumeUp className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/3/asyncio"),
    },
    {
      label: "4. Metaclasses and Type Manipulation",
      icon: <FaBars className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/4/metaclasses"),
    },
    {
      label: "5. Memory Management with gc",
      icon: <FaSearch className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/5/memory-management"),
    },
    {
      label: "6. Context Managers with contextlib",
      icon: <FaUniversalAccess className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/6/context-managers"),
    },
    {
      label: "7. C Extensions with ctypes",
      icon: <FaWindowMaximize className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/7/c-extensions"),
    },
    {
      label: "8. Performance Profiling with cProfile",
      icon: <FaList className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/8/profiling"),
    },
    {
      label: "9. Advanced Logging with logging",
      icon: <FaImage className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/9/logging"),
    },
    {
      label: "10. Building CLI Tools with argparse",
      icon: <FaShieldAlt className="inline mr-2 text-xl" />,
      onClick: (e) => handleOnChange("python-hard/10/cli-tools"),
    },
 
];