import { ROLL_IMPULSE_MINMAX } from "@/app/constants";
import { randomBetweenOneAndZero } from "@/lib";
import { RapierRigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";

import { Die } from "./die";

interface DiceProps {
	shouldDiceRoll: boolean;
}
export const Dice = ({ ...props }: DiceProps) => {
	const { shouldDiceRoll } = props;

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

	useEffect(() => {
		if (shouldDiceRoll) {
			handleRoll();
		}
	}, [shouldDiceRoll]);

	const handleRoll = () => {
		if (diceRefs.current) {
			const rollImpulses: Record<string, number>[] = [];
			setGravityScale(1);
			const { x, y, z } = ROLL_IMPULSE_MINMAX;
			diceRefs.current.forEach((dieRef) => {
				const impulses = {
					x: randomBetweenOneAndZero(x.min, x.max),
					y: randomBetweenOneAndZero(y.min, y.max),
					z: randomBetweenOneAndZero(z.min, z.max),
				};

				rollImpulses.push(impulses);

				if (dieRef) {
					dieRef.applyImpulse(impulses, true);
				}
			});
			console.log("IMPULSE VALUES");
			console.table(rollImpulses);
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
