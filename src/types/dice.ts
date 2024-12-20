import { SIDE_COUNT_OPTIONS } from "@/constants";
import { diceFormSchema } from "@/schemas";
import { z } from "zod";

export type DiceProperties = z.infer<typeof diceFormSchema>;
export type DicePropertyKeys = keyof DiceProperties;
export type DiceState = DiceProperties;

export type SetDiceProps = (
	key: DicePropertyKeys,
	value: number | string
) => void;

export type SideCountOptions = (typeof SIDE_COUNT_OPTIONS)[number];
