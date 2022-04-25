import { Builder } from "@builder.io/react";

export const Background = () => {
  return <div className="background-color">Sample Text</div>;
};

export async function componentRegister() {
  Builder.registerComponent(Background, {
    name: "Background",
  });
}
