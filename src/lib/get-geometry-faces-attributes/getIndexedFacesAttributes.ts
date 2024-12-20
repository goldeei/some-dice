import { FaceAttributes, FaceGetterFunction } from "@/types";
import { TypedArray } from "three";

export const getIndexedFacesAttributes: FaceGetterFunction<"indexed"> = (
	indices,
	vertsPerFace,
	positions,
	faces
) => {
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
};
