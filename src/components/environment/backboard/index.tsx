import { SIDE_SIZE } from "@/app/constants/environment";
import { alignBottomToFloor } from "@/lib";
import { Plane } from "@react-three/drei";

const calcBackboardWidth = (zPos: number, size: number) => {
	const halfDiagonal = size / Math.sqrt(2);
	return 2 * (halfDiagonal - Math.abs(zPos));
};

interface BackboardProps {
	zPos: number;
}
export const Backboard = ({ ...props }: BackboardProps) => {
	const { zPos } = props;

	const width = calcBackboardWidth(zPos, SIDE_SIZE);

	return (
		<Plane
			position={[0, alignBottomToFloor(SIDE_SIZE), zPos]}
			args={[width, SIDE_SIZE]}
		>
			<meshStandardMaterial color="darkblue" />
		</Plane>
	);
};
