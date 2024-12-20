import { DICE_SHAPE_BY_SIDE_COUNT } from "@/constants";
import { VERTICES_PER_TRIANGLE } from "@/constants/3d";
import { FaceAttributes, SideCount } from "@/types";
import { BufferGeometry, NormalBufferAttributes } from "three";

import { getIndexedFacesAttributes } from "./getIndexedFacesAttributes";
import { getNonIndexedFacesAttributes } from "./getNonIndexedFacesAttributes";

export const getGeometryFacesAttributes = (
	geometry: BufferGeometry<NormalBufferAttributes>,
	sideCount: SideCount
): FaceAttributes[] => {
	const trianglesPerFace = DICE_SHAPE_BY_SIDE_COUNT[sideCount].trianglesPerFace,
		positions = geometry.attributes.position.array,
		indices = geometry.index ? geometry.index.array : null,
		faces: FaceAttributes[] = [],
		vertsPerFace = trianglesPerFace * VERTICES_PER_TRIANGLE;

	if (indices) {
		getIndexedFacesAttributes(indices, vertsPerFace, positions, faces);
	} else {
		getNonIndexedFacesAttributes(vertsPerFace, positions, faces);
	}

	return faces;
};
