import { diceFormSchema } from "@/schemas";
import { DiceProperties } from "@/types/dice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import NumericSlider from "./numeric-slider";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

interface DicePropFormProps {
	onDicePropsChange: (key: string, value: unknown) => void;
	diceDefaults: DiceProperties;
	diceProps: DiceProperties;
}

const DicePropForm = ({ ...props }: DicePropFormProps) => {
	const { onDicePropsChange, diceProps, diceDefaults } = props;

	const form = useForm<DiceProperties>({
		resolver: zodResolver(diceFormSchema),
		defaultValues: diceDefaults,
		mode: "onChange",
	});

	const currValues = form.watch();

	useEffect(() => {
		console.log(currValues);
	}, [currValues]);

	return (
		<Form {...form}>
			<form>
				<FormField
					control={form.control}
					name="sides"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sides</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rigidness"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rigidness</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
DicePropForm.displayName = "Dice Prop Form";

export default DicePropForm;
