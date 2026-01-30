import React from "react";

export interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

type Color = unknown;

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface ParamEditorState {
  paramValueMap: Record<number, string>;
}

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (value: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  editor: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  param: {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    alignItems: "center",
    gap: "16px",
  },
  paramLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: "500",
    textAlign: "right",
  },
  paramInput: {
    boxSizing: "border-box",
    width: "280px",
    padding: "8px 12px",
    fontSize: "inherit",
    border: "1px solid #d0d0d0",
    borderRadius: "4px",
  },
} as const;

function ParamInput({ param, value, onChange }: ParamInputProps) {
  // extensible: we can add new cases here later, if new param types appear
  switch (param.type) {
    case "string":
      return (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={styles.paramInput}
        />
      );
    default:
      return null;
  }
}

export default class ParamEditor extends React.Component<
  ParamEditorProps,
  ParamEditorState
> {
  constructor(props: ParamEditorProps) {
    super(props);

    const paramValueMap: Record<number, string> = {};

    props.params.forEach((param) => {
      const existingValueForParam = props.model.paramValues.find(
        (paramValue) => paramValue.paramId === param.id,
      );
      paramValueMap[param.id] = existingValueForParam?.value ?? "";
    });

    this.state = { paramValueMap };
  }

  public getModel(): Model {
    return {
      paramValues: this.props.params.map((param) => ({
        paramId: param.id,
        value: this.state.paramValueMap[param.id] ?? "",
      })),
      colors: this.props.model.colors,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValueMap: { ...prevState.paramValueMap, [paramId]: value },
    }));
  };

  render() {
    return (
      <div style={styles.editor}>
        {this.props.params.map((param) => (
          <label key={param.id} style={styles.param}>
            <span style={styles.paramLabel} title={param.name}>
              {param.name}:
            </span>
            <ParamInput
              param={param}
              value={this.state.paramValueMap[param.id] ?? ""}
              onChange={(value) => this.handleChange(param.id, value)}
            />
          </label>
        ))}
      </div>
    );
  }
}
