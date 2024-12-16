import { useResetWorld } from "@/hooks/useResetWorld";
import { useEffect } from "react";

import { Dice } from "./dice";
import { Environment } from "./environment";

type WorldProps = {
	isDiceRolling: boolean;
	worldResetTrigger: boolean;
};
export const World = ({ ...props }: WorldProps) => {
	const { worldResetTrigger, isDiceRolling } = props;

	// const { resetBodies } = useResetWorld();

	// useEffect(() => {
	// 	resetBodies();
	// }, [resetBodies, worldResetTrigger]);

	return (
		<>
			<Dice shouldDiceRoll={isDiceRolling} />
			<Environment />
		</>
	);
};
