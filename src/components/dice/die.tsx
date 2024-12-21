import { Html, Text } from "@react-three/drei";
import { RapierRigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type DieProps = {
	sides: 4 | 6 | 8 | 12 | 20;
	size?: number;
	position?: [number, number, number];
	color?: string;
	setDieRef?: (die: RapierRigidBody) => void;
};

// Define the mapping of face indices to die numbers for each die type
const DICE_NUMBER_MAPPING = {
	4: {
		// For tetrahedron, adjacent faces sum to 5
		faceNumbers: [1, 2, 3, 4],
		indexToNumber: [1, 4, 2, 3],
	},
	6: {
		// For cube, opposite faces sum to 7
		faceNumbers: [1, 2, 3, 4, 5, 6],
		// Maps geometry face index to actual die number
		// This mapping ensures opposite faces sum to 7
		indexToNumber: [1, 6, 2, 5, 3, 4],
	},
	8: {
		// For octahedron, opposite faces sum to 9
		faceNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
		indexToNumber: [1, 8, 2, 7, 3, 6, 4, 5],
	},
	12: {
		// For dodecahedron, opposite faces sum to 13
		faceNumbers: Array.from({ length: 12 }, (_, i) => i + 1),
		indexToNumber: [1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7],
	},
	20: {
		// For icosahedron, opposite faces sum to 21
		faceNumbers: Array.from({ length: 20 }, (_, i) => i + 1),
		indexToNumber: [
			1, 20, 2, 19, 3, 18, 4, 17, 5, 16, 6, 15, 7, 14, 8, 13, 9, 12, 10, 11,
		],
	},
} as const;

export const Die = ({
	sides = 6,
	size = 0.25,
	position = [0, 0, 0],
	color = "lightgrey",
	setDieRef,
}: DieProps) => {
	const meshRef = useRef<THREE.Mesh>(null);
	const rigidBodyRef = useRef<RapierRigidBody>(null);

	// Create geometry and extract face data
	const { geometry, faces } = useMemo(() => {
		let geometry: THREE.BufferGeometry;

		switch (sides) {
			case 4:
				geometry = new THREE.TetrahedronGeometry(size);
				break;
			case 6:
				geometry = new THREE.BoxGeometry(size, size, size);
				break;
			case 8:
				geometry = new THREE.OctahedronGeometry(size);
				break;
			case 12:
				geometry = new THREE.DodecahedronGeometry(size);
				break;
			case 20:
				geometry = new THREE.IcosahedronGeometry(size);
				break;
			default:
				geometry = new THREE.BoxGeometry(size, size, size);
		}

		const positionArray = geometry.attributes.position.array;
		const normalArray = geometry.attributes.normal.array;
		const faces: {
			position: THREE.Vector3;
			normal: THREE.Vector3;
			id: number;
		}[] = [];

		// Determine vertices per face based on geometry type
		const getVerticiesPerFace = () => {
			if (sides === 6) return 4;
			if (sides === 12) return 9;
			return 3;
		};
		const verticesPerFace = getVerticiesPerFace();

		// Calculate center and normal for each face
		for (let f = 0; f < positionArray.length / (verticesPerFace * 3); f++) {
			const faceNormal = new THREE.Vector3();
			const faceCenter = new THREE.Vector3();

			// Average the vertices to get face center and normal
			for (let v = 0; v < verticesPerFace; v++) {
				const baseIndex = (f * verticesPerFace + v) * 3;

				faceCenter.add(
					new THREE.Vector3(
						positionArray[baseIndex],
						positionArray[baseIndex + 1],
						positionArray[baseIndex + 2]
					)
				);

				faceNormal.add(
					new THREE.Vector3(
						normalArray[baseIndex],
						normalArray[baseIndex + 1],
						normalArray[baseIndex + 2]
					)
				);
			}

			faceCenter.divideScalar(verticesPerFace);

			// Move label pos to not clip with die
			faceCenter.multiplyScalar(1.01);
			faceNormal.divideScalar(verticesPerFace).normalize();

			const { indexToNumber } = DICE_NUMBER_MAPPING[sides];
			// Get the actual die number for this face from our mapping
			const dieNumber = indexToNumber[f];

			faces.push({
				position: faceCenter,
				normal: faceNormal,
				id: dieNumber,
			});
		}

		return { geometry, faces };
	}, [sides, size]);

	useEffect(() => {
		if (rigidBodyRef.current && setDieRef) {
			setDieRef(rigidBodyRef.current);
		}
	}, [setDieRef]);

	const getFaceRotation = (normal: THREE.Vector3): THREE.Euler => {
		// This simpler version focuses on getting consistent orientation first
		const rotationMatrix = new THREE.Matrix4();

		// Calculate a suitable up vector
		// We use a different up vector if the normal is too aligned with the default up
		const worldUp = new THREE.Vector3(0, 0, 0);
		const alignmentWithUp = Math.abs(normal.dot(worldUp));
		const up =
			alignmentWithUp > 0.9
				? new THREE.Vector3(0, 0, 1) // Use forward as up if normal is vertical
				: worldUp;

		// Create rotation matrix to align with normal
		rotationMatrix.lookAt(
			new THREE.Vector3(0, 0, 0), // origin
			normal, // look at normal
			up // up vector
		);

		const euler = new THREE.Euler().setFromRotationMatrix(rotationMatrix);

		return euler;
	};

	return (
		<group position={position}>
			<mesh ref={meshRef} geometry={geometry}>
				<meshStandardMaterial color={color} />
			</mesh>

			{faces.map((face, i) => {
				const { normal, position, id } = face;

				const rotation = getFaceRotation(face.normal);
				const scale = [1, 1, 1];
				if (
					face.normal.toArray().some((normal) => normal !== 0) &&
					face.normal.y >= 0
				) {
					scale[0] = -1;
				}
				if (face.normal.y < 0) {
					scale[1] = -1;
				}
				if (face.normal.z > 0 && face.normal.y > 0) {
					scale[1] = -1;
					scale[0] = 1;
				}

				// console.groupCollapsed(face.id);
				// console.log("POSITION");
				// console.log(face.position);
				// console.log("NORMAL");
				// console.log(face.normal);
				// console.log("SCALE");
				// console.log(scale);
				// console.groupEnd();

				const fontSize = size * 0.3;
				return (
					<group
						key={`face-${i}`}
						position={face.position}
						rotation={rotation}
						onClick={() => console.log(id)}
					>
						<Text
							fontSize={fontSize}
							anchorX="center"
							anchorY="middle"
							scale={scale}
						>
							{face.id}
						</Text>
						{id === 9 || id === 6 ? (
							<mesh position={[0, scale[1] > 0 ? -0.05 : 0.05, 0]}>
								<boxGeometry args={[0.05, 0.01, 0]} />
								<meshBasicMaterial color="white" />
							</mesh>
						) : null}
					</group>
				);
			})}
		</group>
	);
};
