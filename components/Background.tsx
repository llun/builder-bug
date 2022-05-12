import { Builder } from "@builder.io/react";

interface Props {
  title: string;
}

export const Background = ({ title }: Props) => {
  return <div className="background-color">{title}</div>;
};

export async function componentRegister() {
  Builder.registerComponent(Background, {
    name: "Background",
    inputs: [
      {
        name: "title",
        type: "string",
      },
    ],
  });
}
