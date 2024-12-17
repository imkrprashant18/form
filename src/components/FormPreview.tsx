import React from "react";
import { FormElementType, FormLayout } from "./FormBuilder";

interface FormPreviewProps {
  elements: FormElementType[];
  layout: FormLayout;
}

const FormPreview: React.FC<FormPreviewProps> = ({ elements, layout }) => {
  const gridClass = {
    single: "grid-cols-1",
    double: "grid-cols-1 md:grid-cols-2",
    triple: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[layout];

  return (
    <form className={`grid ${gridClass} gap-4 bg-white p-4 rounded shadow`}>
      {elements.map((element) => (
        <div key={element.id} className="mb-4">
          <label
            htmlFor={element.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {element.label}
          </label>
          {element.type === "text" && (
            <input
              type="text"
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded"
              aria-describedby={`${element.id}-error`}
            />
          )}
          {element.type === "textarea" && (
            <textarea
              id={element.id}
              name={element.id}
              rows={3}
              className="w-full p-2 border rounded"
              aria-describedby={`${element.id}-error`}
            ></textarea>
          )}
          {element.type === "select" && (
            <select
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded"
              aria-describedby={`${element.id}-error`}
            >
              {element.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {element.type === "number" && (
            <input
              type="number"
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded"
              aria-describedby={`${element.id}-error`}
            />
          )}
          {element.type === "email" && (
            <input
              type="email"
              id={element.id}
              name={element.id}
              className="w-full p-2 border rounded"
              aria-describedby={`${element.id}-error`}
            />
          )}
          {element.type === "checkbox" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={element.id}
                name={element.id}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={element.id}
                className="ml-2 block text-sm text-gray-900"
              >
                {element.label}
              </label>
            </div>
          )}
          {element.type === "radio" && (
            <div>
              {element.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`${element.id}-${index}`}
                    name={element.id}
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={`${element.id}-${index}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
          {element.validation && (
            <p id={`${element.id}-error`} className="mt-1 text-sm text-red-600">
              Validation: {element.validation.description}
            </p>
          )}
        </div>
      ))}
      {elements.length > 0 && (
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default FormPreview;
