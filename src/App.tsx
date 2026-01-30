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

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: "24px 8px",
    gap: "1.5rem",
    fontFamily: "system-ui, sans-serif",
    fontSize: "1rem",
  },
  getModelButtonWrapper: {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    gap: "16px",
  },
  getModelButton: {
    gridColumn: "2",
    width: "fit-content",
    padding: "8px 16px",
    fontSize: "inherit",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    cursor: "pointer",
  },
} as const;

export function App() {
  const ref = useRef<ParamEditor>(null);

  return (
    <div style={styles.app}>
      <ParamEditor ref={ref} params={params} model={model} />
      <div style={styles.getModelButtonWrapper}>
        <button
          onClick={() => console.log(ref.current?.getModel())}
          style={styles.getModelButton}
        >
          Получить модель в консоль
        </button>
      </div>
    </div>
  );
}
