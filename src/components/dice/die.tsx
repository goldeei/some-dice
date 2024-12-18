import { RoundedBox } from "@react-three/drei";
import {
	RapierRigidBody,
	RigidBody,
	RigidBodyProps,
} from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

type Die = RigidBodyProps & {
	ref: (die: RapierRigidBody | null) => void;
	shouldReadSides: boolean;
	color?: string;
};
export const Die = ({ ...props }: Die) => {
	const { color = "lightgrey", ref, position, shouldReadSides, name } = props;
	const meshRef = useRef<Mesh>(null);

	useEffect(() => {
		if (meshRef.current && shouldReadSides) {
			const geo = meshRef.current.geometry;
			const vertices = geo.attributes.position.array;

			console.log(name, vertices);
		}
	}, [name, shouldReadSides]);

	return (
		<RigidBody ref={ref} density={1.5} position={position}>
			<RoundedBox
				ref={meshRef}
				args={[0.25, 0.25, 0.25]}
				position={position}
				radius={0.02}
				smoothness={5}
				bevelSegments={4}
			>
				<meshStandardMaterial color={color} />
			</RoundedBox>
		</RigidBody>
	);
};
