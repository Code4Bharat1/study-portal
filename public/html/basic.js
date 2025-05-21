  const htmlPracticeMenu = [
    { label: "1. Create Basic Page", icon: <FaRegFileAlt className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("basic/1/html-1") },
    { label: "2. Add Headings", icon: <FaHeading className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("add-headings") },
    { label: "3. Add Paragraphs", icon: <FaParagraph className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("add-paragraphs") },
    { label: "4. Create a Link", icon: <FaLink className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("create-link") },
    { label: "5. Insert an Image", icon: <FaImage className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("insert-image") },
    { label: "6. Make a List", icon: <FaListUl className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("make-list") },
    { label: "7. Create a Table", icon: <FaTable className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("create-table") },
    { label: "8. Use HTML Forms", icon: <FaCheckSquare className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("html-forms") },
    { label: "9. Use Comments", icon: <FaCode className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("html-comments") },
    { label: "10. HTML Boilerplate", icon: <FaHtml5 className="inline mr-2 text-xl" />, onClick: (e) => handleOnChange("html-boilerplate") }
  ];