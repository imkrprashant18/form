import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FormElementType } from "./FormBuilder";

interface FormElementProps {
  element: FormElementType;
  index: number;
  updateElement: (id: string, updates: Partial<FormElementType>) => void;
  removeElement: (id: string) => void;
}

const FormElement: React.FC<FormElementProps> = ({
  element,
  index,
  updateElement,
  removeElement,
}) => {
  return (
    <Draggable draggableId={element.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-2 rounded shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{element.type}</span>
            <button
              onClick={() => removeElement(element.id)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${element.type} field`}
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={element.label}
            onChange={(e) =>
              updateElement(element.id, { label: e.target.value })
            }
            className="w-full p-2 border rounded"
            aria-label={`Label for ${element.type} field`}
          />
          {(element.type === "select" || element.type === "radio") && (
            <textarea
              value={element.options?.join("\n")}
              onChange={(e) =>
                updateElement(element.id, {
                  options: e.target.value.split("\n"),
                })
              }
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter options (one per line)"
              rows={3}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default FormElement;
