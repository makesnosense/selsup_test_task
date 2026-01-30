import { useRef } from "react";
import ParamEditor, { type Param } from "./ParamEditor";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

export function App() {
  const ref = useRef<ParamEditor>(null);

  return (
    <div>
      <ParamEditor ref={ref} params={params} model={model} />
      <button onClick={() => console.log(ref.current?.getModel())}>
        Получить модель в консоль
      </button>
    </div>
  );
}
