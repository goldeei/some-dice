import { useResetWorld } from "@/hooks/useResetWorld";
import { RigidBody } from "@react-three/rapier";
import { Dispatch, SetStateAction, useEffect } from "react";

import { Dice } from "./dice";
import { Environment } from "./environment";

type WorldProps = {
	worldResetTrigger: boolean;
	setIsSimPaused: Dispatch<SetStateAction<boolean>>;
};
export const World = ({ ...props }: WorldProps) => {
	const { worldResetTrigger, setIsSimPaused } = props;

	const { resetBodies } = useResetWorld(setIsSimPaused);

	useEffect(() => {
		resetBodies();
	}, [resetBodies, worldResetTrigger]);

	return (
		<>
			<Dice />
			<Environment />
		</>
	);
};
