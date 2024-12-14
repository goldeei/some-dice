import { FLOOR_Y, SIDE_SIZE } from "@/app/constants/environment";
import { getRotationArrayFromDegrees } from "@/lib";
import { Plane } from "@react-three/drei";

type ZSide = "front" | "back";
type XSide = "left" | "right";

type FloorSide = {
	isFloor: true;
	xSide?: never;
	zSide?: never;
};

type NonFloorSide = {
	isFloor?: never;
	xSide: XSide;
	zSide: ZSide;
};

type Side = FloorSide | NonFloorSide;

const getSidePos = (
	size: number,
	floor: number,
	zSide: ZSide | undefined,
	xSide: XSide | undefined,
	isFloor = false
) => {
	if (isFloor) return [0, floor, 0];
	const yPos = size / 2 + floor;
	const xDir = xSide === "left" ? -1 : 1;
	const zDir = zSide === "back" ? -1 : 1;

	const calcOffset = (size / 2) * Math.SQRT1_2;
	const xPos = xDir * calcOffset;
	const zPos = zDir * calcOffset;

	return [xPos, yPos, zPos];
};

const getRotation = (
	isFloor = false,
	zSide: ZSide | undefined,
	xSide: XSide | undefined
) => {
	if (isFloor) return getRotationArrayFromDegrees([270, 0, 45]);

	if (zSide === "front") {
		return xSide === "left"
			? getRotationArrayFromDegrees([0, 315, 0])
			: getRotationArrayFromDegrees([0, 45, 0]);
	} else {
		return xSide === "left"
			? getRotationArrayFromDegrees([0, 45, 0])
			: getRotationArrayFromDegrees([0, 315, 0]);
	}
};

export const Side = ({ ...props }: Side) => {
	const { isFloor, zSide, xSide } = props;
	const position = getSidePos(SIDE_SIZE, FLOOR_Y, zSide, xSide, isFloor);
	const rotation = getRotation(isFloor, zSide, xSide);

	return (
		<Plane
			args={[SIDE_SIZE, SIDE_SIZE]}
			position={position}
			rotation={rotation}
		>
			<meshStandardMaterial
				color="lightblue"
				transparent={zSide === "front"}
				opacity={zSide === "front" ? 0 : 1}
			/>
		</Plane>
	);
};
