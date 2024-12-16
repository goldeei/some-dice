import { Physics } from "@react-three/rapier";

import { Dice } from "./dice";
import { Environment } from "./environment";

type WorldProps = {
	isDiceRolling: boolean;
	worldResetTrigger: boolean;
};
export const World = ({ ...props }: WorldProps) => {
	const { worldResetTrigger, isDiceRolling } = props;

	return (
		<Physics>
			<Dice shouldDiceRoll={isDiceRolling} shouldReset={worldResetTrigger} />
			<Environment />
		</Physics>
	);
};
