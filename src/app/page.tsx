"use client";

import DicePropForm from "@/components/dice-prop-form";
import { useState } from "react";

export default function Home() {
	const diceDefaults = {
		sides: 4,
		material: "material1",
		rigidness: 50,
	};

	const [sides, setSides] = useState(diceDefaults.sides);
	const [material, setMaterial] = useState(diceDefaults.material);
	const [rigidness, setRigidness] = useState(diceDefaults.rigidness);

	const setDiceProp = {
		sides: setSides,
		material: setMaterial,
		rigidness: setRigidness,
	};

	const handleDicePropChange = (key: string, value: unknown) =>
		console.table({ sides, material, rigidness });

	return (
		<div id="root">
			<main className="flex-1 flex items-center justify-center">
				<DicePropForm
					onDicePropsChange={handleDicePropChange}
					diceDefaults={diceDefaults}
					diceProps={{ sides, material, rigidness }}
				/>
			</main>
			<footer></footer>
		</div>
	);
}
