import { Builder } from "@builder.io/react";

interface Props {
  title: string;
}

export const Background = ({ title }: Props) => {
  console.log("Title", title);
  return <div className="background-color">{title || "Title"}</div>;
};

export async function componentRegister() {
  Builder.registerComponent(Background, {
    name: "Title",
    inputs: [
      {
        name: "title",
        type: "string",
        localized: true,
      },
    ],
  });
}
