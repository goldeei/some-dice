import { MATERIALS } from "@/app/constants/dice";
import { diceFormSchema } from "@/schemas";
import { DiceProperties, SetDiceProps } from "@/types/dice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";

interface DicePropFormProps {
	onDicePropsChange: SetDiceProps;
	diceDefaults: DiceProperties;
	diceProps: DiceProperties;
}

const DicePropForm = ({ ...props }: DicePropFormProps) => {
	const { onDicePropsChange, diceProps, diceDefaults } = props;

	const form = useForm<DiceProperties>({
		resolver: zodResolver(diceFormSchema),
		defaultValues: diceDefaults,
	});

	const handleValueChange = (name: keyof DiceProperties, v: number) =>
		onDicePropsChange(name, v);

	const onSubmit = (values: DiceProperties) => console.log(values);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="sides"
					render={({ field: { name } }) => (
						<FormItem>
							<FormLabel>Sides</FormLabel>
							<FormControl>
								<Slider
									min={0}
									max={100}
									step={1}
									onValueChange={(v) => handleValueChange(name, v[0])}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="rigidness"
					render={({ field: { name } }) => (
						<FormItem>
							<FormLabel>Rigidness {diceProps[name]}</FormLabel>
							<FormControl>
								<Slider
									min={0}
									max={100}
									step={1}
									onValueChange={(v) => handleValueChange(name, v[0])}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="material"
					render={({ field: { name, value } }) => (
						<FormItem>
							<FormLabel>Material</FormLabel>
							<FormControl>
								<RadioGroup
									value={value.toString()}
									onValueChange={(v) => handleValueChange(name, Number(v))}
								>
									{MATERIALS.map((material, i) => (
										<div key={material}>
											<RadioGroupItem value={i.toString()} id={material} />
											<FormLabel htmlFor={material}>{material}</FormLabel>
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
