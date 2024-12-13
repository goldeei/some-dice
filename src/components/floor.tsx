import { Cylinder } from "@react-three/drei";

export const Floor = ({}) => {
	return (
		<Cylinder args={[2, 2, 0.25, 32]} position={[0, -2, 0]}>
			<meshStandardMaterial color="blue" />
		</Cylinder>
	);
};
