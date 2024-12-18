"use client";

import DicePropForm from "@/components/dice-prop-form";
import { Button } from "@/components/ui/button";
import { World } from "@/components/world";
import { RollContext } from "@/context/RollContext";
import { DiceProperties } from "@/types";
import {
	Environment,
	OrbitControls,
	Preload,
	useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, use, useEffect, useMemo, useState } from "react";

import { MATERIALS } from "../constants/dice";

export default function Home() {
	const diceDefaults = {
		sides: 4,
		material: MATERIALS[0],
		rigidness: 50,
	};

	const [sides, setSides] = useState(diceDefaults.sides);
	const [material, setMaterial] = useState(diceDefaults.material);
	const [rigidness, setRigidness] = useState(diceDefaults.rigidness);
	const [worldResetTrigger, setWorldResetTrigger] = useState(true);

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
	useEffect(() => {
		console.table(diceProps);
	}, [diceProps]);

	const handleDicePropChange = <Key extends keyof DiceProperties>(
		key: Key,
		value: DiceProperties[Key]
	) => {
		setDiceProp[key](value);
	};

	const handleDicePropFormSubmit = (values: DiceProperties) =>
		console.log("Form Submit", values);

	const progress = useProgress();

	const { currentRollState, setCurrentRollState } = use(RollContext);
	const handleDiceRoll = () => {
		setCurrentRollState({
			...currentRollState,
			isFresh: false,
			isRolling: true,
		});
	};

	const handleWorldReset = () => {
		setWorldResetTrigger(!worldResetTrigger);
		setCurrentRollState({
			...currentRollState,
			isFresh: true,
			isRolling: false,
		});
	};

	return (
		<div id="root">
			<main className="relative">
				<div className="h-dvh w-svw">
					{progress.progress < 100 && (
						<div className="text-center absolute left-1/2 -translate-x-1/2 top-1/2">
							Loading...
						</div>
					)}
					<Canvas fallback={<div>Sorry no WebGL supported!</div>}>
						<Suspense fallback={null}>
							<Environment preset="sunset" />
							<World worldResetTrigger={worldResetTrigger} />
							<OrbitControls />
							<Preload all />
						</Suspense>
					</Canvas>
				</div>
				<div className="absolute top-0 left-0">
					<DicePropForm
						onDicePropsChange={handleDicePropChange}
						diceDefaults={diceDefaults}
						diceProps={{ sides, material, rigidness }}
						onSubmit={handleDicePropFormSubmit}
					/>
					<Button
						onPointerDown={handleDiceRoll}
						disabled={currentRollState.isRolling}
					>
						Roll
					</Button>
					<Button
						onPointerDown={handleWorldReset}
						disabled={currentRollState.isFresh}
					>
						Reset
					</Button>
				</div>
			</main>
			<footer></footer>
		</div>
	);
}
