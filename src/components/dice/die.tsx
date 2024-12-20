import { DICE_SHAPE_BY_SIDE_COUNT } from "@/constants";
import { getGeometryFacesAttributes } from "@/lib/get-geometry-faces-attributes";
import { FaceAttributes, SideCountOptions } from "@/types";
import {
	RapierRigidBody,
	RigidBody,
	RigidBodyProps,
} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Die = RigidBodyProps & {
	setDieRef: (die: RapierRigidBody) => void;
	shouldReadSides: boolean;
	sides: SideCountOptions;
	color?: string;
};
export const Die = ({ ...props }: Die) => {
	const {
		color = "lightgrey",
		setDieRef,
		position,
		shouldReadSides,
		name,
		sides = 6,
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
	const [faces, setFaces] = useState<FaceAttributes[]>([]);
	useEffect(() => {
		setKey((prevKey) => prevKey + 1);
		if (rigidBodyRef.current && meshRef.current) {
			setFaces(getGeometryFacesAttributes(meshRef.current.geometry, sides));
		}
	}, [sides, size]);

	useEffect(() => {
		if (faces) {
			console.table(faces);
		}
	}, [faces]);

	const geometryProps = DICE_SHAPE_BY_SIDE_COUNT[sides];
	const geometry = new geometryProps.geo(...geometryProps.setArgs(size));

	return (
		<RigidBody
			key={key}
			ref={rigidBodyRef}
			colliders="hull"
			position={position}
			gravityScale={0}
			density={1.25}
		>
			<mesh ref={meshRef} geometry={geometry} position={position}>
				<meshStandardMaterial color={color} />
			</mesh>
		</RigidBody>
	);
};
