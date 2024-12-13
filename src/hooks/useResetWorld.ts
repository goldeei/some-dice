import { useRapier } from "@react-three/rapier";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useResetWorld = (
	setIsSimPaused: Dispatch<SetStateAction<boolean>>
) => {
	const { world } = useRapier();

	const resetBodies = useCallback(() => {
		world.bodies.forEach((body) => {
			body.resetForces(true);
			body.resetTorques(true);
			body.setLinvel({ x: 0, y: 0, z: 0 }, true);
			body.setAngvel({ x: 0, y: 0, z: 0 }, true);
			body.setTranslation({ x: 0, y: 0, z: 0 }, true);
			body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
			body.wakeUp();
		});
		setTimeout(() => {
			setIsSimPaused(true);
		}, 50);
	}, [setIsSimPaused, world.bodies]);

	return { resetBodies };
};
