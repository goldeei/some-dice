import { ROLL_IMPULSE_MINMAX } from "@/app/constants";
import { randomBetweenOneAndZero } from "@/lib";
import { RapierRigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

import { Die } from "./die";

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
			const { x, y, z } = ROLL_IMPULSE_MINMAX;
			diceRefs.current.forEach((dieRef) => {
				console.log({
					x: randomBetweenOneAndZero(x.min, x.max),
					y: randomBetweenOneAndZero(y.min, y.max),
					z: randomBetweenOneAndZero(z.min, z.max),
				});
				if (dieRef) {
					dieRef.applyImpulse(
						{
							x: randomBetweenOneAndZero(x.min, x.max),
							y: randomBetweenOneAndZero(y.min, y.max),
							z: randomBetweenOneAndZero(z.min, z.max),
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
