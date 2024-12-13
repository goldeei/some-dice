"use client";

import DicePropForm from "@/components/dice-prop-form";
import { DiceProperties } from "@/types";
import { useEffect, useMemo, useState } from "react";

import { MATERIALS } from "./constants/dice";

export default function Home() {
	const diceDefaults = {
		sides: 4,
		material: MATERIALS[0],
		rigidness: 50,
	};

	const [sides, setSides] = useState(diceDefaults.sides);
	const [material, setMaterial] = useState(diceDefaults.material);
	const [rigidness, setRigidness] = useState(diceDefaults.rigidness);

	const setDiceProp: {
		[key in keyof DiceProperties]: React.Dispatch<
			React.SetStateAction<DiceProperties[key]>
		>;
	} = {
		sides: setSides,
		material: setMaterial,
		rigidness: setRigidness,
	};

	const diceProps = useMemo(
		() => ({ sides, material, rigidness }),
		[sides, material, rigidness]
	);

	const handleDicePropChange = <Key extends keyof DiceProperties>(
		key: Key,
		value: DiceProperties[Key]
	) => {
		setDiceProp[key](value);
	};

	useEffect(() => {
		console.log(diceProps);
	}, [diceProps]);

	const handleDicePropFormSubmit = (values: DiceProperties) =>
		console.log("Form Submit", values);

	return (
		<div id="root">
			<main className="flex-1 flex items-center justify-center">
				<DicePropForm
					onDicePropsChange={handleDicePropChange}
					diceDefaults={diceDefaults}
					diceProps={{ sides, material, rigidness }}
					onSubmit={handleDicePropFormSubmit}
				/>
			</main>
			<footer></footer>
		</div>
	);
}
