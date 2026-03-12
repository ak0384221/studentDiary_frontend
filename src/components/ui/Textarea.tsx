import { TextareaHTMLAttributes } from "react";

export const Textarea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>,
) => {
  return <textarea className="text-black" {...props} />;
};
