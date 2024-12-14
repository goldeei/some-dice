export const TestCube = ({}) => {
	return (
		<mesh>
			<boxGeometry args={[0.5, 0.5, 0.5]} />
			<meshStandardMaterial color="hotpink" />
		</mesh>
	);
};
