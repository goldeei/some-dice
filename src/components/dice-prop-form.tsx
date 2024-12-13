import { MATERIALS, RIGIDNESS_MINMAX, SIDE_MINMAX } from "@/app/constants/dice";
import { diceFormSchema } from "@/schemas";
import { DiceProperties, SetDiceProps } from "@/types/dice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { NumericSlider } from "./numeric-slider";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface DicePropFormProps {
	onDicePropsChange: SetDiceProps;
	diceDefaults: DiceProperties;
	diceProps: DiceProperties;
	onSubmit: (values: DiceProperties) => void;
}

const DicePropForm = ({ ...props }: DicePropFormProps) => {
	const { onDicePropsChange, diceProps, diceDefaults, onSubmit } = props;

	const form = useForm<DiceProperties>({
		resolver: zodResolver(diceFormSchema),
		defaultValues: diceDefaults,
	});

	const formValues = form.watch();
	const prevValues = useRef<DiceProperties>(formValues);

	const handleValueChange = useCallback(
		(name: keyof DiceProperties, v: number) => onDicePropsChange(name, v),
		[onDicePropsChange]
	);
	useEffect(() => {
		const changedKey = Object.keys(formValues).find((key) => {
			const k = key as keyof DiceProperties;
			return formValues[k] !== prevValues.current[k];
		}) as keyof DiceProperties | undefined;

		if (changedKey) {
			handleValueChange(changedKey, formValues[changedKey]);
			prevValues.current = formValues;
		}
	}, [formValues, handleValueChange]);

	const onFormSubmit = (values: DiceProperties) => onSubmit(values);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onFormSubmit)}>
				<FormField
					control={form.control}
					name="sides"
					render={({ field: { name, onChange } }) => (
						<FormItem>
							<FormLabel>Sides {diceProps[name]}</FormLabel>
							<FormControl>
								<NumericSlider
									min={SIDE_MINMAX.min}
									max={SIDE_MINMAX.max}
									step={2}
									onValueChange={onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rigidness"
					render={({ field: { name, onChange } }) => (
						<FormItem>
							<FormLabel>Rigidness {diceProps[name]}</FormLabel>
							<FormControl>
								<NumericSlider
									min={RIGIDNESS_MINMAX.min}
									max={RIGIDNESS_MINMAX.max}
									step={1}
									onValueChange={onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="material"
					render={({ field: { value, onChange } }) => (
						<FormItem>
							<FormLabel>Material</FormLabel>
							<FormControl>
								<RadioGroup
									defaultValue={value.toString()}
									onValueChange={() => onChange(Number(value))}
								>
									{MATERIALS.map((material, i) => (
										<div key={material}>
											<RadioGroupItem value={i.toString()} id={material} />
											<Label htmlFor={material} className="cursor-pointer">
												{material}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
DicePropForm.displayName = "Dice Prop Form";

export default DicePropForm;
