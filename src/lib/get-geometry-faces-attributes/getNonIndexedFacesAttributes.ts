import { FaceGetterFunction } from "@/types";

export const getNonIndexedFacesAttributes: FaceGetterFunction<"non-indexed"> = (
	vertsPerFace,
	positions,
	faces
) => {
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
};
