import { Box, Text } from "@react-three/drei";
import { useRef } from "react";
import { Vector } from "three/examples/jsm/Addons.js";

interface DieLabelProps {
	position: Vector;
	label: string | number;
}
export const DieLabel = ({ ...props }: DieLabelProps) => {
	const { position, label } = props;

	const ref = useRef(null);

	return (
		<Text
			position={[position.x + 0.25, position.y + 0.25, position.z + 0.25]}
			fontSize={1}
			color="black"
			rotation={[0, Math.PI / 4, 0]}
		>
			{label}
		</Text>
	);
};
