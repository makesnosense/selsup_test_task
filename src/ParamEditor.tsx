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
