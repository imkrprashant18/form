import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { z } from "zod";
import FormPreview from "./FormPreview";
import ToolBox from "./ToolBox";
import ValidationConfig from "./ValidationConfig";
import CodeGenerator from "./CodeGenerator";

export type FormElementType = {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "number"
    | "email"
    | "checkbox"
    | "radio";
  label: string;
  options?: string[];
  validation?: z.ZodTypeAny;
};

export type FormLayout = "single" | "double" | "triple";

const FormBuilder: React.FC = () => {
  const [elements, setElements] = useState<FormElementType[]>([]);
  const [layout, setLayout] = useState<FormLayout>("single");

  const addElement = (type: FormElementType["type"]) => {
    const newElement: FormElementType = {
      id: `element-${Date.now()}`,
      type,
      label: `New ${type} field`,
      options:
        type === "select" || type === "radio"
          ? ["Option 1", "Option 2"]
          : undefined,
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const updateElement = (id: string, updates: Partial<FormElementType>) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setElements(items);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Form Builder</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <ToolBox addElement={addElement} setLayout={setLayout} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="form-elements" type="list">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded min-h-[200px]"
                >
                  {elements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 mb-2 rounded shadow"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">
                              {element.type}
                            </span>
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
                              updateElement(element.id, {
                                label: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                            aria-label={`Label for ${element.type} field`}
                          />
                          {(element.type === "select" ||
                            element.type === "radio") && (
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Form Preview</h2>
          <FormPreview elements={elements} layout={layout} />
        </div>
        <div className="w-full lg:w-1/3">
          <ValidationConfig elements={elements} updateElement={updateElement} />
          <CodeGenerator elements={elements} layout={layout} />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
