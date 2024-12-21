import { DICE_SHAPE_BY_SIDE_COUNT } from "@/constants";
import { VERTICES_PER_TRIANGLE } from "@/constants/3d";
import { FaceAttributes, FaceGetterParams, SideCountOptions } from "@/types";
import { BufferGeometry, Mesh, NormalBufferAttributes } from "three";

import { getIndexedFacesAttributes } from "./getIndexedFacesAttributes";
import { getNonIndexedFacesAttributes } from "./getNonIndexedFacesAttributes";

export const getGeometryFacesAttributes = (
	mesh: Mesh<BufferGeometry>,
	sideCount: SideCountOptions
): FaceAttributes[] => {
	const { geometry, rotation } = mesh;

	const trianglesPerFace = DICE_SHAPE_BY_SIDE_COUNT[sideCount].trianglesPerFace,
		positions = geometry.attributes.position.array,
		indices = geometry.index ? geometry.index.array : null,
		faces: FaceAttributes[] = [],
		vertsPerFace = trianglesPerFace * VERTICES_PER_TRIANGLE;

	const params: FaceGetterParams = [
		vertsPerFace,
		positions,
		faces,
		rotation,
		sideCount,
	];
	if (indices) {
		getIndexedFacesAttributes(indices, ...params);
	} else {
		getNonIndexedFacesAttributes(...params);
	}

	console.log(faces);
	return faces;
};
