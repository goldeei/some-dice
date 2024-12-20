import {
	MATERIALS,
	RIGIDNESS_MINMAX,
	SIDE_COUNT_OPTIONS,
} from "@/constants/dice";
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
		(name: keyof DiceProperties, v: number | string) =>
			onDicePropsChange(name, v),
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
					render={({ field: { name, value, onChange } }) => (
						<FormItem>
							<FormLabel>Sides {diceProps[name]}</FormLabel>
							<FormControl>
								<RadioGroup
									defaultValue={value.toString()}
									onValueChange={(v) => onChange(Number(v))}
								>
									{SIDE_COUNT_OPTIONS.map((sideCount) => (
										<div key={`side-count-radio-${sideCount}`}>
											<RadioGroupItem
												value={`${sideCount}`}
												id={`side-count-radio-${sideCount}`}
											/>
											<Label
												htmlFor={`side-count-radio-${sideCount}`}
												className="cursor-pointer"
											>
												{sideCount}
											</Label>
										</div>
									))}
								</RadioGroup>
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
									onValueChange={onChange}
								>
									{MATERIALS.map((material) => (
										<div key={material}>
											<RadioGroupItem value={material} id={material} />
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
