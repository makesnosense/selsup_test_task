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

interface Color {}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface ParamEditorState {
  paramValues: ParamValue[];
}

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (value: string) => void;
}

function ParamInput({ param, value, onChange }: ParamInputProps) {
  // extensible: we can add new cases here later, if new param types appear
  switch (param.type) {
    case "string":
      return (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
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

    const initialParamValues = props.params.map((param) => {
      const existingValue = props.model.paramValues.find(
        (paramValue) => paramValue.paramId === param.id,
      );

      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : "",
      };
    });

    this.state = { paramValues: initialParamValues };
  }

  public getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue,
      ),
    }));
  };

  render() {
    return (
      <div>
        {this.props.params.map((param) => {
          const paramValueFromState = this.state.paramValues.find(
            (paramValue) => paramValue.paramId === param.id,
          );

          return (
            <label key={param.id}>
              {param.name}:
              <ParamInput
                param={param}
                value={paramValueFromState?.value ?? ""}
                onChange={(value) => this.handleChange(param.id, value)}
              />
            </label>
          );
        })}
      </div>
    );
  }
}
