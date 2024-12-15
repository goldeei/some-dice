import { RigidBody } from "@react-three/rapier";

import { Backboard } from "./backboard";
import { Side } from "./side";

export const Environment = ({}) => {
	return (
		<RigidBody type="fixed" restitution={1.1}>
			<Side isFloor />
			<Side zSide="back" xSide="left" />
			<Side zSide="back" xSide="right" />
			<Side zSide="front" xSide="right" />
			<Side zSide="front" xSide="left" />
			<Backboard zPos={-1.5} />
		</RigidBody>
	);
};
