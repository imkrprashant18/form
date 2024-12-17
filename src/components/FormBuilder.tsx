import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { z } from "zod";
import FormElement from "./FormElement";
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
            <Droppable droppableId="form-elements">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded min-h-[200px]"
                >
                  {elements.map((element, index) => (
                    <FormElement
                      key={element.id}
                      element={element}
                      index={index}
                      updateElement={updateElement}
                      removeElement={removeElement}
                    />
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
