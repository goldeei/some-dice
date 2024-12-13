import { diceFormSchema } from "@/schemas";
import { z } from "zod";

export type DiceProperties = z.infer<typeof diceFormSchema>;
export type DicePropertyKeys = keyof DiceProperties;
export type DiceState = DiceProperties;

export type SetDiceProps = (
	key: DicePropertyKeys,
	value: number | string
) => void;
