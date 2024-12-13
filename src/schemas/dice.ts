import { z } from "zod";

export const diceFormSchema = z.object({
	sides: z.number(),
	material: z.string(),
	rigidness: z.number(),
});
