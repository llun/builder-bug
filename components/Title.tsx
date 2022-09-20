import { Builder } from "@builder.io/react";

interface Props {
  title: string;
  attributes: any;
}

export const Background = ({ title, attributes }: Props) => {
  console.log("Title", title);
  return (
    <div {...attributes} className={`background-color ${attributes.className}`}>
      {title || "Title"}
    </div>
  );
};

export async function componentRegister() {
  Builder.registerComponent(Background, {
    name: "Title",
    inputs: [
      {
        name: "title",
        type: "string",
      },
    ],
    noWrap: true,
  });
}
