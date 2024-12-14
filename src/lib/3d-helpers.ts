import { RotationArray, RotationMinMax } from "@/types";

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
 * @param rot - The array of rotation values in degrees, where each element corresponds to an axis (x, y, z). Positive 0-360.
 * @returns A new array with rotation values in radians.
 */
export const getRotationArrayFromDegrees = (rot: RotationArray) => {
	// Default to [0, 0, 0] if no rotation is provided
	if (rot.every((num) => num === 0)) return rot;

	// Convert each non-zero rotation value to radians, leaving zero values unchanged
	// Zero values are retained because they represent no rotation and don't require modification.
	const rotation = rot.map((deg) =>
		deg !== 0 ? getRotationFromDegrees(deg) : deg
	) as RotationArray;

	// Return the potentially modified rotation array with values in radians
	return rotation;
};

// POSITION
// export const
