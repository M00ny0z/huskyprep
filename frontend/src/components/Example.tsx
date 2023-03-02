import { useState } from "react";

export interface ExampleObj {
  name: string;
  code: string;
  title?: string;
}

export function Example({ name, code, title = "Today" }: ExampleObj) {
  const [curr, setCurr] = useState<ExampleObj>({
    name: "Unknown",
    code: "ABC123",
  });
  console.log(curr);
  console.log(title);
  return <div>Hello</div>;
}
