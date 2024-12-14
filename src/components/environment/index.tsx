import { RigidBody } from "@react-three/rapier";

import { Side } from "./side";

export const Environment = ({}) => {
	return (
		<RigidBody type="fixed">
			<Side isFloor />
			<Side zSide="back" xSide="left" />
			<Side zSide="back" xSide="right" />
			<Side zSide="front" xSide="right" />
			<Side zSide="front" xSide="left" />
		</RigidBody>
	);
};
