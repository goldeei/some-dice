import { z } from "zod";

import { stringAsNumber } from "./utils";

export const diceFormSchema = z.object({
	sides: stringAsNumber.min(4).max(24),
	material: z.string(),
	rigidness: stringAsNumber.min(1).max(100),
});
