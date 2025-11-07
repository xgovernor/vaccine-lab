import { nanoid } from "nanoid";

export function getId() {
  const id = nanoid();

  return id;
}
