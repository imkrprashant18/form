import React from "react";
import { FormElementType, FormLayout } from "./FormBuilder";

interface CodeGeneratorProps {
  elements: FormElementType[];
  layout: FormLayout;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ elements, layout }) => {
  const generateCode = () => {
    const imports = `import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';`;

    const schema = `const schema = z.object({
${elements
  .map((el) => `  ${el.id}: ${el.validation?.toString() || "z.string()"},`)
  .join("\n")}
});`;

    const gridClass = {
      single: "grid-cols-1",
      double: "grid-cols-1 md:grid-cols-2",
      triple: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    }[layout];

    const component = `
export default function GeneratedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid ${gridClass} gap-4">
      ${elements
        .map(
          (el) => `
      <div className="mb-4">
        <label htmlFor="${
          el.id
        }" className="block text-sm font-medium text-gray-700 mb-1">
          ${el.label}
        </label>
        ${
          el.type === "textarea"
            ? `<textarea
          id="${el.id}"
          {...register("${el.id}")}
          className="w-full p-2 border rounded"
        ></textarea>`
            : el.type === "select"
            ? `<select
          id="${el.id}"
          {...register("${el.id}")}
          className="w-full p-2 border rounded"
        >
          ${el.options
            ?.map((option) => `<option value="${option}">${option}</option>`)
            .join("\n          ")}
        </select>`
            : el.type === "checkbox"
            ? `<input
          type="checkbox"
          id="${el.id}"
          {...register("${el.id}")}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />`
            : el.type === "radio"
            ? `<div>
          ${el.options
            ?.map(
              (option, index) => `
          <div className="flex items-center">
            <input
              type="radio"
              id="${el.id}-${index}"
              value="${option}"
              {...register("${el.id}")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="${el.id}-${index}" className="ml-2 block text-sm text-gray-900">
              ${option}
            </label>
          </div>`
            )
            .join("")}
        </div>`
            : `<input
          type="${el.type}"
          id="${el.id}"
          {...register("${el.id}")}
          className="w-full p-2 border rounded"
        />`
        }
        {errors.${el.id} && (
          <p className="mt-1 text-sm text-red-600">{errors.${el.id}.message}</p>
        )}
      </div>`
        )
        .join("")}
      <div className="col-span-full">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}`;

    return `${imports}\n\n${schema}\n\n${component}`;
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Generated Code</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  );
};

export default CodeGenerator;
