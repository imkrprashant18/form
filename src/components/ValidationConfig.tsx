import React from "react";
import { z } from "zod";
import { FormElementType } from "./FormBuilder";

interface ValidationConfigProps {
  elements: FormElementType[];
  updateElement: (id: string, updates: Partial<FormElementType>) => void;
}

const ValidationConfig: React.FC<ValidationConfigProps> = ({
  elements,
  updateElement,
}) => {
  const setValidation = (id: string, validationType: string) => {
    let validation: z.ZodTypeAny | undefined;

    switch (validationType) {
      case "required":
        validation = z.string().min(1, { message: "This field is required" });
        break;
      case "email":
        validation = z.string().email({ message: "Invalid email address" });
        break;
      case "number":
        validation = z.number({ invalid_type_error: "Must be a number" });
        break;
      case "regex":
        validation = z
          .string()
          .regex(/^[a-zA-Z]+$/, { message: "Must contain only letters" });
        break;
      case "none":
        validation = undefined;
        break;
    }

    updateElement(id, { validation });
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Validation Rules</h2>
      {elements.map((element) => (
        <div key={element.id} className="mb-2">
          <label
            htmlFor={`validation-${element.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {element.label}
          </label>
          <select
            id={`validation-${element.id}`}
            onChange={(e) => setValidation(element.id, e.target.value)}
            className="w-full p-2 border rounded"
            value={element.validation ? element.validation.description : "none"}
          >
            <option value="none">No validation</option>
            <option value="required">Required</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="regex">Regex (letters only)</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default ValidationConfig;
