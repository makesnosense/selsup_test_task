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

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

export default class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
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
      paramValues: prevState.paramValues.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv,
      ),
    }));
  };

  renderParamInput(param: Param, value: string): React.ReactNode {
    // extensible: we can add new cases here later, if new param types appear
    switch (param.type) {
      case "string":
        return (
          <input
            type="text"
            value={value}
            onChange={(event) =>
              this.handleChange(param.id, event.target.value)
            }
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {this.props.params.map((param) => {
          const paramValueFromState = this.state.paramValues.find(
            (paramValue) => paramValue.paramId === param.id,
          );

          return (
            <div key={param.id}>
              <label>
                {param.name}:
                {this.renderParamInput(param, paramValueFromState?.value ?? "")}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
