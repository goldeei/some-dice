import { RoundedBox } from "@react-three/drei";
import {
	RapierRigidBody,
	RigidBody,
	RigidBodyProps,
} from "@react-three/rapier";

type Die = RigidBodyProps & {
	ref: (die: RapierRigidBody | null) => void;
	color?: string;
};
export const Die = ({ ...props }: Die) => {
	const { color = "lightgrey", ref, gravityScale, position } = props;

	return (
		<RigidBody
			ref={ref}
			density={1.5}
			gravityScale={gravityScale}
			position={position}
		>
			<RoundedBox args={[0.25, 0.25, 0.25]} position={position}>
				<meshStandardMaterial color={color} />
			</RoundedBox>
		</RigidBody>
	);
};
