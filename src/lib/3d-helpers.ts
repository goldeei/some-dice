import { DICE_SHAPE_BY_SIDE_COUNT } from "@/constants";
import { FLOOR_Y } from "@/constants/environment";
import { RotationArray, RotationMinMax, SideCount } from "@/types";
import { BufferGeometry, Mesh, NormalBufferAttributes } from "three";
import { Vector } from "three/examples/jsm/Addons.js";

// ROTATION
/**
 * Converts degrees to radians.
 *
 * This is a simple helper to convert degrees to radians as most math operations in JavaScript,
 * especially those dealing with 3D transformations, expect radians. The formula for this
 * conversion is: radians = degrees * (π / 180). This method simplifies that conversion process
 * whenever degrees are provided.
 *
 * @param deg - The angle in degrees to convert. Positive 0-360.
 * @returns The angle converted to radians.
 */
export const getRotationFromDegrees = (deg: RotationMinMax) => {
	return deg * (Math.PI / 180);
};

/**
 * Converts an array of rotation values from degrees to radians, selectively.
 *
 * This method takes an array of rotation values (`rot`) in degrees and converts each value
 * to radians. However, we only perform the conversion on non-zero values to avoid unnecessary
 * computations and retain the default values (like zero rotation) as they are. If no rotation values
 * are provided, we default to `[0, 0, 0]` (no rotation).
 *
 * - We only convert values that are non-zero because rotating by 0 degrees doesn't affect the object,
 *   and applying a conversion would be redundant.
 * - If no rotation is provided, we fall back to `[0, 0, 0]`, which represents no rotation.
 *
 * @param rotArr - The array of rotation values in degrees, where each element corresponds to an axis (x, y, z). Positive 0-360.
 * @returns A new array with rotation values in radians.
 */
export const getRotationArrayFromDegrees = (rotArr: RotationArray) => {
	// Default to [0, 0, 0] if no rotation is provided
	if (rotArr.every((num) => num === 0)) return rotArr;

	// Convert each non-zero rotation value to radians, leaving zero values unchanged
	// Zero values are retained because they represent no rotation and don't require modification.
	const rotation = rotArr.map((deg) =>
		deg !== 0 ? getRotationFromDegrees(deg) : deg
	) as RotationArray;

	// Return the potentially modified rotation array with values in radians
	return rotation;
};

export const alignBottomToFloor = (size: number) => size / 2 + FLOOR_Y;

export const getFaceInfo = (
	geometry: BufferGeometry<NormalBufferAttributes>,
	sideCount: SideCount
): {
	id: number;
	centerPos: Vector;
}[] => {
	const trianglesPerFace = DICE_SHAPE_BY_SIDE_COUNT[sideCount].trianglesPerFace;

	const positions = geometry.attributes.position.array;
	const indices = geometry.index ? geometry.index.array : [];

	const vertsPerTriangle = 3;
	// We get this number to be able to identify the chunks to break the positions array into
	const vertsPerFace = trianglesPerFace * vertsPerTriangle;

	const faces: { id: number; centerPos: Vector }[] = [];

	// Handle indexed geometry (like cubes)
	if (indices.length > 0) {
		for (let i = 0; i < indices.length; i += vertsPerFace) {
			const faceIndices = indices.slice(i, i + vertsPerFace);

			let x = 0,
				y = 0,
				z = 0;
			for (let j = 0; j < faceIndices.length; j++) {
				const index = faceIndices[j];
				x += positions[index * 3];
				y += positions[index * 3 + 1];
				z += positions[index * 3 + 2];
			}

			x /= faceIndices.length;
			y /= faceIndices.length;
			z /= faceIndices.length;

			faces.push({ id: i / vertsPerFace / 3, centerPos: { x, y, z } });
		}
	} else {
		for (let i = 0; i < positions.length; i += vertsPerFace * 3) {
			const faceVerts = positions.slice(i, i + vertsPerFace * 3);

			let x = 0,
				y = 0,
				z = 0;
			for (let j = 0; j < vertsPerFace; j++) {
				x += faceVerts[j * 3];
				y += faceVerts[j * 3 + 1];
				z += faceVerts[j * 3 + 2];
			}

			x /= vertsPerFace;
			y /= vertsPerFace;
			z /= vertsPerFace;

			faces.push({ id: i / vertsPerFace / 3 + 1, centerPos: { x, y, z } });
		}
	}
	return faces;
};
