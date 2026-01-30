import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import ParamEditor, { type Param } from "./ParamEditor";

describe("ParamEditor", () => {
  const params: Param[] = [
    { id: 1, name: "Purpose", type: "string" },
    { id: 2, name: "Length", type: "string" },
    { id: 3, name: "Material", type: "string" },
  ];

  describe("displays fields based on params", () => {
    it("renders all param fields with labels", () => {
      const model = { paramValues: [], colors: [] };

      render(<ParamEditor params={params} model={model} />);

      expect(screen.getByLabelText("Purpose:")).toBeInTheDocument();
      expect(screen.getByLabelText("Length:")).toBeInTheDocument();
      expect(screen.getByLabelText("Material:")).toBeInTheDocument();
    });

    it("renders correct number of input fields", () => {
      const model = { paramValues: [], colors: [] };

      render(<ParamEditor params={params} model={model} />);

      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(3);
    });
  });

  describe("initializes correctly from model.paramValues", () => {
    it("displays existing values from model", () => {
      const model = {
        paramValues: [
          { paramId: 1, value: "casual" },
          { paramId: 2, value: "maxi" },
        ],
        colors: [],
      };

      render(<ParamEditor params={params} model={model} />);

      const input1 = screen.getByLabelText("Purpose:") as HTMLInputElement;
      const input2 = screen.getByLabelText("Length:") as HTMLInputElement;
      const input3 = screen.getByLabelText("Material:") as HTMLInputElement;

      expect(input1.value).toBe("casual");
      expect(input2.value).toBe("maxi");
      expect(input3.value).toBe("");
    });

    it("handles params without initial values", () => {
      const model = { paramValues: [], colors: [] };

      render(<ParamEditor params={params} model={model} />);

      const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
      inputs.forEach((input) => {
        expect(input.value).toBe("");
      });
    });
  });

  describe("returns correct getModel() result after changes", () => {
    it("returns updated model after user input", async () => {
      const user = userEvent.setup();
      const ref = createRef<ParamEditor>();
      const model = {
        paramValues: [{ paramId: 1, value: "casual" }],
        colors: [],
      };

      render(<ParamEditor ref={ref} params={params} model={model} />);

      const input1 = screen.getByLabelText("Purpose:");
      await user.clear(input1);
      await user.type(input1, "sport");

      const input2 = screen.getByLabelText("Length:");
      await user.type(input2, "midi");

      const receivedModel = ref.current?.getModel();

      const expectedModel = {
        paramValues: [
          { paramId: 1, value: "sport" },
          { paramId: 2, value: "midi" },
          { paramId: 3, value: "" },
        ],
        colors: [],
      };

      expect(receivedModel).toEqual(expectedModel);
    });

    it("preserves colors array from original model", async () => {
      const user = userEvent.setup();
      const ref = createRef<ParamEditor>();
      const colors = [{ id: 1, name: "red" }];
      const model = {
        paramValues: [],
        colors,
      };

      render(<ParamEditor ref={ref} params={params} model={model} />);

      const input = screen.getByLabelText("Purpose:");
      await user.type(input, "test");

      const result = ref.current?.getModel();

      expect(result?.colors).toBe(colors);
    });

    it("returns all params in getModel even if not edited", () => {
      const ref = createRef<ParamEditor>();
      const model = { paramValues: [], colors: [] };

      render(<ParamEditor ref={ref} params={params} model={model} />);

      const receivedModel = ref.current?.getModel();

      const expectedParamValues = [
        { paramId: 1, value: "" },
        { paramId: 2, value: "" },
        { paramId: 3, value: "" },
      ];

      expect(receivedModel?.paramValues).toHaveLength(3);
      expect(receivedModel?.paramValues).toEqual(expectedParamValues);
    });
  });
});
