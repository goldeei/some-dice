import { ROLL_ANGVEL_MINMAX, ROLL_IMPULSE_MINMAX } from "@/app/constants";
import { randomBetweenOneAndZero } from "@/lib";
import { RapierRigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { Vector } from "three/examples/jsm/Addons.js";

import { Die } from "./die";

interface DiceProps {
	shouldDiceRoll: boolean;
	shouldReset: boolean;
}
export const Dice = ({ ...props }: DiceProps) => {
	const { shouldDiceRoll, shouldReset } = props;

	const { world } = useRapier();

	const dice = ["dice1", "dice2", "dice3", "dice4", "dice5"];
	const colors = ["red", "blue", "purple", "yellow", "orange"];

	const diceRefs = useRef<(RapierRigidBody | null)[]>([]);
	const originalPos = useRef<Vector[]>([]);
	const originalRot = useRef<Quaternion[]>([]);

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
		diceRefs.current.forEach((ref, i) => {
			if (ref) {
				const pos = ref.translation();
				const rot = ref.rotation();
				originalPos.current[i] = new Vector3(pos.x, pos.y, pos.z);
				originalRot.current[i] = new Quaternion(rot.x, rot.y, rot.z, rot.w);
			}
		});
	}, []);

	useEffect(() => {
		handleRoll();
	}, [shouldDiceRoll]);

	useEffect(() => {
		diceRefs.current.forEach((ref, i) => {
			if (ref) {
				const pos = originalPos.current[i];
				const rot = originalRot.current[i];
				ref.setTranslation(
					{
						x: pos.x,
						y: pos.y,
						z: pos.z,
					},
					false
				);
				ref.setRotation(
					{
						x: rot.x,
						y: rot.y,
						z: rot.z,
						w: rot.w,
					},
					false
				);
				ref.setLinvel({ x: 0, y: 0, z: 0 }, false);
				ref.setAngvel({ x: 0, y: 0, z: 0 }, false);
				ref.setGravityScale(0, false);
				ref.wakeUp();
			}
		});
		// world.step();
	}, [shouldReset, world]);

	const handleRoll = () => {
		if (diceRefs.current) {
			const rollImpulses: Record<string, number>[] = [];
			const { x, y, z } = ROLL_IMPULSE_MINMAX;
			diceRefs.current.forEach((dieRef) => {
				const impulses = {
					x: randomBetweenOneAndZero(x.min, x.max),
					y: randomBetweenOneAndZero(y.min, y.max),
					z: randomBetweenOneAndZero(z.min, z.max),
				};

				rollImpulses.push(impulses);

				if (dieRef) {
					dieRef.setGravityScale(1, true);
					dieRef.applyImpulse(impulses, true);
					const angvelMinMax = randomBetweenOneAndZero(
						ROLL_ANGVEL_MINMAX.min,
						ROLL_ANGVEL_MINMAX.max
					);

					dieRef.setAngvel(
						{
							x: angvelMinMax,
							y: angvelMinMax,
							z: angvelMinMax,
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
					position={getOffsetPosition(i)}
					color={colors[i]}
				/>
			))}
		</group>
	);
};
