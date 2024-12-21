import { DICE_ROTATIONS } from "@/constants";
import { FaceGetterFunction } from "@/types";
import { Euler, Vector3 } from "three";

import { getFaceRotation } from "./getFaceRotation";

export const calculateRotationFromNormal = (normal: Vector3): Euler => {
	// Calculate Y-axis rotation to align normal.x with Z-axis
	const yRotation = Math.atan2(normal.x, normal.z);

	// Rotate the normal to account for Y-axis rotation
	const rotatedNormal = normal
		.clone()
		.applyAxisAngle(new Vector3(0, 1, 0), -yRotation);

	// Calculate X-axis rotation to align normal.y with Z-axis
	const xRotation = Math.atan2(rotatedNormal.y, rotatedNormal.z);

	return new Euler(xRotation, yRotation, 0, "XYZ");
};

export const getIndexedFacesAttributes: FaceGetterFunction<"indexed"> = (
	indices,
	vertsPerFace,
	positions,
	faces,
	shapeRotation,
	sideCount
) => {
	const normals: Vector3[] = [];

	for (let i = 0; i < indices.length; i += vertsPerFace) {
		const faceIndices = indices.slice(i, i + vertsPerFace);
		const vertices: Vector3[] = [];
		faceIndices.forEach((idx) => {
			const x = positions[idx * 3],
				y = positions[idx * 3 + 1],
				z = positions[idx * 3 + 2];
			vertices.push(new Vector3(x, y, z));
		});

		const v1 = vertices[0],
			v2 = vertices[1],
			v3 = vertices[2];

		const edge1 = new Vector3().subVectors(v2, v1);
		const edge2 = new Vector3().subVectors(v3, v1);

		const normal = new Vector3().crossVectors(edge1, edge2).normalize();
		normals.push(normal);

		const center = new Vector3(0, 0, 0);
		for (let j = 0; j < faceIndices.length; j++) {
			const index = faceIndices[j];
			center.x += positions[index * 3];
			center.y += positions[index * 3 + 1];
			center.z += positions[index * 3 + 2];
		}
		center.divideScalar(faceIndices.length);

		const rotation = new Euler(
			DICE_ROTATIONS[sideCount][faces.length].x,
			DICE_ROTATIONS[sideCount][faces.length].y,
			DICE_ROTATIONS[sideCount][faces.length].z
		);

		faces.push({
			id: faces.length + 1,
			centerPos: center,
			rotation,
		});
	}
};
