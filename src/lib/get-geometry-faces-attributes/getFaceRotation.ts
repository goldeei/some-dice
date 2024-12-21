import { Euler, Quaternion, Vector3 } from "three";

const calcDihedralAngle = (normal1: Vector3, normal2: Vector3) => {
	const dotProduct = normal1.dot(normal2);
	const angle = Math.acos(Math.min(Math.max(dotProduct, -1), 1));

	return angle;
};
export const getFaceRotation = (
	shapeRot: Euler,
	faceIdx: number,
	totalFaces: number,
	normal1: Vector3,
	normal2: Vector3
) => {
	// Ensure there are enough normals and they are valid before proceeding
	if (!normal1 || !normal2) {
		console.warn("Insufficient normals or invalid face indices");
		return new Euler(0, 0, 0); // Return a default rotation when insufficient normals
	}

	// const normal1 = faceNormals[faceIdx];

	// const nextFaceIdx = (faceIdx + 1) % totalFaces;
	// const normal2 = faceNormals[nextFaceIdx];

	// if (!normal1 || !normal2) {
	// 	return new Euler(0, 0, 0);
	// }

	const dihedralAngle = calcDihedralAngle(normal1, normal2);

	// The axis of rotation is the cross product of the two normals
	const rotationAxis = new Vector3().crossVectors(normal1, normal2).normalize();

	// Create the Euler rotation based on the dihedral angle and rotation axis
	const rotationQuaternion = new Quaternion().setFromAxisAngle(
		rotationAxis,
		dihedralAngle
	);

	// Convert the shape's Euler rotation into a quaternion
	const shapeRotQuaternion = new Quaternion().setFromEuler(shapeRot);

	// Combine the quaternions
	shapeRotQuaternion.multiply(rotationQuaternion);

	// Convert the combined quaternion back into an Euler object
	const rotationEuler = new Euler().setFromQuaternion(rotationQuaternion);

	return rotationEuler;
};
