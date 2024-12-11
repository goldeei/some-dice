import { z } from "zod";

export const stringAsNumber = z.coerce.number();
