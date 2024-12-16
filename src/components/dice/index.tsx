import { RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

import { Die } from "./die";

const rollXMin = -0.1;
const rollXMax = 0.1;

const rollYMin = -0.05;
const rollYMax = 0.01;

const rollZMin = -0.05;
const rollZMax = -0.1;

export const Dice = ({}) => {
	const dice = ["dice1", "dice2", "dice3", "dice4", "dice5"];
	const colors = ["red", "blue", "purple", "yellow", "orange"];
	const diceRefs = useRef<(RapierRigidBody | null)[]>([]);

	const [gravityScale, setGravityScale] = useState(0);

	const getOffsetPosition = (i: number) => {
		let x: number;
		const arrayMiddle = Math.floor(dice.length / 2);
		if (i === arrayMiddle) {
			x = 0;
		} else {
			x = 0.5 * (i - arrayMiddle);
		}
		return [x, 0, 0];
	};

	const handleRoll = () => {
		if (diceRefs.current) {
			setGravityScale(1);
			diceRefs.current.forEach((dieRef) => {
				console.log({
					x: Math.random() * (rollXMax - rollXMin) + rollXMin,
					y: Math.random() * (rollYMax - rollYMin) + rollYMin,
					z: Math.random() * (rollZMax - rollZMin) + rollZMin,
				});
				if (dieRef) {
					dieRef.applyImpulse(
						{
							x: Math.random() * (rollXMax - rollXMin) + rollXMin,
							y: Math.random() * (rollYMax - rollYMin) + rollYMin,
							z: Math.random() * (rollZMax - rollZMin) + rollZMin,
						},
						true
					);
				}
			});
		}
	};

	return (
		<group name="dice" onClick={handleRoll}>
			{dice.map((_, i) => (
				<Die
					key={i}
					ref={(die: RapierRigidBody | null) => {
						diceRefs.current[i] = die;
					}}
					gravityScale={gravityScale}
					position={getOffsetPosition(i)}
					color={colors[i]}
				/>
			))}
		</group>
	);
};
