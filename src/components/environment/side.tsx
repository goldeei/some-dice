import { getRotationFromDegrees } from "@/lib";
import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const size = 4;
export const Side = ({}) => {
	return (
		<RigidBody type="fixed">
			{/* Base Plane */}
			<Plane
				args={[size, size]}
				position={[0, -2, 0]}
				rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
			>
				<meshStandardMaterial color="lightgrey" />
			</Plane>

			{/* Left Side Plane */}
			<Plane
				args={[size, size]}
				position={[
					-(size / 2) * Math.SQRT1_2, // X: Left edge of rotated base
					0, // Y: Matches the height of the base
					-(size / 2) * Math.SQRT1_2, // Z: Diagonal backward edge
				]}
				rotation={[0, getRotationFromDegrees(45), 0]} // Upright, facing inward
			>
				<meshStandardMaterial color="lightgrey" />
			</Plane>

			{/* Right Side Plane */}
			<Plane
				args={[size, size]}
				position={[
					(size / 2) * Math.SQRT1_2, // X: Right edge of rotated base
					0, // Y: Matches the height of the base
					-(size / 2) * Math.SQRT1_2, // Z: Diagonal backward edge
				]}
				rotation={[0, getRotationFromDegrees(315), 0]} // Upright, facing inward
			>
				<meshStandardMaterial color="lightgrey" />
			</Plane>
		</RigidBody>
	);
};
