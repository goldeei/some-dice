import { RoundedBox } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

interface Die {
	color?: string;
}
export const Die = ({ ...props }: Die) => {
	const { color = "lightgrey" } = props;

	const dieRef = useRef<RapierRigidBody>(null);
	const [gravityScale, setGravityScale] = useState(0);

	const handleRoll = () => {
		if (dieRef.current) {
			setGravityScale(1);
			dieRef.current.applyImpulse({ x: 0, y: -0.05, z: -0.1 }, true);
		}
	};

	return (
		<RigidBody ref={dieRef} gravityScale={gravityScale} density={1.5}>
			<RoundedBox args={[0.25, 0.25, 0.25]} onClick={handleRoll}>
				<meshStandardMaterial color={color} />
			</RoundedBox>
		</RigidBody>
	);
};
