import { DICE_ROTATIONS } from "@/constants";
import { FaceGetterFunction } from "@/types";
import { Euler, Vector3 } from "three";

import { getFaceRotation } from "./getFaceRotation";

export const getNonIndexedFacesAttributes: FaceGetterFunction<"non-indexed"> = (
	vertsPerFace,
	positions,
	faces,
	shapeRotation,
	sideCount
) => {
	for (let i = 0; i < positions.length; i += vertsPerFace * 3) {
		const faceVerts = positions.slice(i, i + vertsPerFace * 3);

		const center = new Vector3(0, 0, 0);
		for (let j = 0; j < vertsPerFace; j++) {
			center.x += faceVerts[j * 3];
			center.y += faceVerts[j * 3 + 1];
			center.z += faceVerts[j * 3 + 2];
		}
		center.divideScalar(vertsPerFace);

		const rotation = new Euler(
			DICE_ROTATIONS[sideCount][faces.length].x,
			DICE_ROTATIONS[sideCount][faces.length].y,
			DICE_ROTATIONS[sideCount][faces.length].z
		);

		faces.push({ id: faces.length + 1, centerPos: center, rotation });
	}
};
