import { Physics } from "@react-three/rapier";

import { Dice } from "./dice";
import { Environment } from "./environment";

type WorldProps = {
	worldResetTrigger: boolean;
};
export const World = ({ ...props }: WorldProps) => {
	const { worldResetTrigger } = props;

	return (
		<Physics>
			<Dice shouldReset={worldResetTrigger} />
			<Environment />
		</Physics>
	);
};
