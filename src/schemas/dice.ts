import { z } from "zod";

export const diceFormSchema = z.object({
	sides: z.number(),
	material: z.number(),
	rigidness: z.number(),
});
