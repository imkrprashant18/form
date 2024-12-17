import React from "react";
import { FormElementType, FormLayout } from "./FormBuilder";

interface ToolBoxProps {
  addElement: (type: FormElementType["type"]) => void;
  setLayout: (layout: FormLayout) => void;
}

const ToolBox: React.FC<ToolBoxProps> = ({ addElement, setLayout }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Toolbox</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          "text",
          "textarea",
          "select",
          "number",
          "email",
          "checkbox",
          "radio",
        ].map((type) => (
          <button
            key={type}
            onClick={() => addElement(type as FormElementType["type"])}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add {type}
          </button>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">Layout</h3>
      <div className="flex gap-2">
        {["single", "double", "triple"].map((layout) => (
          <button
            key={layout}
            onClick={() => setLayout(layout as FormLayout)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            {layout} column
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolBox;
