"use client";

import DicePropForm from "@/components/dice-prop-form";
import { Button } from "@/components/ui/button";
import { World } from "@/components/world";
import { DiceProperties } from "@/types";
import {
	Environment,
	OrbitControls,
	Preload,
	useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useState } from "react";

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
	const [worldResetTrigger, setWorldResetTrigger] = useState(true);
	const [worldDidPlay, setWorldDidPlay] = useState(false);
	const [isSimPaused, setIsSimPaused] = useState(true);

	useEffect(() => {
		if (!isSimPaused) {
			setWorldDidPlay(true);
		}
	}, [isSimPaused]);

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

	const progress = useProgress();
	useEffect(() => {
		console.log(progress);
	}, [progress]);

	const handleWorldReset = () => {
		setWorldResetTrigger(!worldResetTrigger);
		setWorldDidPlay(false);
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
							<Physics>
								<World
									worldResetTrigger={worldResetTrigger}
									setIsSimPaused={setIsSimPaused}
								/>
							</Physics>
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
					<Button onPointerDown={() => setIsSimPaused(!isSimPaused)}>
						{isSimPaused ? "Play" : "Pause"}
					</Button>
					<Button onPointerDown={handleWorldReset} disabled={!worldDidPlay}>
						Reset
					</Button>
				</div>
			</main>
			<footer></footer>
		</div>
	);
}
