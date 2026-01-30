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
      paramValues: [],
      colors: [],
    };
  }
  render() {
    return <div>ParamEditor работает!</div>;
  }
}
