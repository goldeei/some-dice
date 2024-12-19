import { SideCount } from "@/types";
import {
	RapierRigidBody,
	RigidBody,
	RigidBodyProps,
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface DieShapeProps {
	sideCount: number;
	children: React.ReactElement<THREE.MeshStandardMaterial>;
	size: number;
	meshRef: React.RefObject<THREE.Mesh | null>;
}
const DieShape = ({ sideCount, children, size, meshRef }: DieShapeProps) => {
	useEffect(() => {
		let g: THREE.BufferGeometry;
		switch (sideCount) {
			case 2:
				g = new THREE.CylinderGeometry(size, size, size * 0.1);
				break;
			case 6:
				g = new THREE.BoxGeometry(size, size, size);
				break;
			case 8:
				g = new THREE.OctahedronGeometry(size);

				break;
			case 10:
				g = new THREE.DodecahedronGeometry(size);

				break;
			case 20:
				g = new THREE.IcosahedronGeometry(size);
				break;
			default:
				g = new THREE.TetrahedronGeometry(size);
				break;
		}
		if (meshRef.current) {
			meshRef.current.geometry = g;
		}
	}, [meshRef, sideCount, size]);

	return <mesh ref={meshRef}>{children}</mesh>;
};

type Die = RigidBodyProps & {
	setDieRef: (die: RapierRigidBody) => void;
	shouldReadSides: boolean;
	sides: SideCount;
	color?: string;
};
export const Die = ({ ...props }: Die) => {
	const {
		color = "lightgrey",
		setDieRef,
		position,
		shouldReadSides,
		name,
		sides = 3,
	} = props;
	const meshRef = useRef<THREE.Mesh>(null);
	const rigidBodyRef = useRef<RapierRigidBody>(null);

	useEffect(() => {
		if (rigidBodyRef.current && shouldReadSides) {
			console.log(rigidBodyRef.current.collider(0).shape);
		}
	}, [name, shouldReadSides]);

	useEffect(() => {
		if (rigidBodyRef.current) {
			setDieRef(rigidBodyRef.current);
		}
	}, [setDieRef]);

	const size = 0.25;

	const [key, setKey] = useState(0);
	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
		if (rigidBodyRef.current) {
			console.log(rigidBodyRef.current);
		}
	}, [sides, size]);

	return (
		<RigidBody
			key={key}
			ref={rigidBodyRef}
			colliders="hull"
			position={position}
			gravityScale={0}
			density={1.25}
		>
			<DieShape meshRef={meshRef} sideCount={sides} size={size}>
				<meshStandardMaterial color={color} />
			</DieShape>
		</RigidBody>
	);
};
