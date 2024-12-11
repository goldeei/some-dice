import { diceFormSchema } from "@/schemas";
import { z } from "zod";

export type DiceProperties = z.infer<typeof diceFormSchema>;
export type DiceState = DiceProperties;
