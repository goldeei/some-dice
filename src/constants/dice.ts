import { getRotationArrayFromDegrees, getRotationFromDegrees } from "@/lib";
import { RotationArray, SideCountOptions } from "@/types";
import {
	BoxGeometry,
	BufferGeometry,
	CylinderGeometry,
	DodecahedronGeometry,
	IcosahedronGeometry,
	Mesh,
	OctahedronGeometry,
	PolyhedronGeometry,
	TetrahedronGeometry,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import Geometries from "three/src/renderers/common/Geometries.js";

// DICE PROPS
export const MATERIALS = ["material1", "material2", "material3"];
export const SIDE_MINMAX = {
	min: 2,
	max: 20,
};
export const RIGIDNESS_MINMAX = {
	min: 0,
	max: 100,
};

// ROLL
export const ROLL_IMPULSE_MINMAX = {
	x: {
		min: -0.1,
		max: 0.1,
	},
	y: {
		min: -0.05,
		max: 0.01,
	},
	z: {
		min: -0.05,
		max: -0.1,
	},
};
export const ROLL_ANGVEL_MINMAX = {
	min: -10,
	max: 10,
};

export const DICE_ROTATIONS: Record<
	SideCountOptions,
	Array<{ x: number; y: number; z: number }>
> = {
	4: [
		{ x: Math.PI / 2, y: 0, z: 0 }, // Face 1
		{ x: -Math.PI / 2, y: 0, z: 0 }, // Face 2
		{ x: 0, y: Math.PI / 2, z: 0 }, // Face 3
		{ x: 0, y: -Math.PI / 2, z: 0 }, // Face 4
	],
	6: [
		{ x: 0, y: Math.PI / 2, z: 0 }, // Face 1
		{ x: 0, y: -Math.PI / 2, z: 0 }, // Face 2
		{ x: Math.PI / 2, y: 0, z: 0 }, // Face 3
		{ x: -Math.PI / 2, y: 0, z: 0 }, // Face 4
		{ x: 0, y: 0, z: 0 }, // Face 5
		{ x: Math.PI, y: 0, z: 0 }, // Face 6
	],
	8: [
		{ x: 0, y: 0, z: 0 }, // Face 1
		{ x: Math.PI / 2, y: 0, z: 0 }, // Face 2
		{ x: Math.PI, y: 0, z: 0 }, // Face 3
		{ x: -Math.PI / 2, y: 0, z: 0 }, // Face 4
		{ x: 0, y: Math.PI / 2, z: 0 }, // Face 5
		{ x: 0, y: -Math.PI / 2, z: 0 }, // Face 6
		{ x: Math.PI / 4, y: Math.PI / 4, z: 0 }, // Face 7
		{ x: -Math.PI / 4, y: -Math.PI / 4, z: 0 }, // Face 8
	],
	12: [
		{ x: 0, y: 0, z: 0 }, // Face 1
		{ x: Math.PI / 2, y: 0, z: 0 }, // Face 2
		{ x: Math.PI, y: 0, z: 0 }, // Face 3
		{ x: -Math.PI / 2, y: 0, z: 0 }, // Face 4
		{ x: 0, y: Math.PI / 2, z: 0 }, // Face 5
		{ x: 0, y: -Math.PI / 2, z: 0 }, // Face 6
		{ x: Math.PI / 4, y: 0, z: Math.PI / 4 }, // Face 7
		{ x: Math.PI / 4, y: Math.PI / 4, z: Math.PI / 4 }, // Face 8
		{ x: -Math.PI / 4, y: 0, z: -Math.PI / 4 }, // Face 9
		{ x: -Math.PI / 4, y: -Math.PI / 4, z: -Math.PI / 4 }, // Face 10
		{ x: 0, y: 0, z: Math.PI / 4 }, // Face 11
		{ x: 0, y: 0, z: -Math.PI / 4 }, // Face 12
	],
	20: [
		{ x: 0, y: 0, z: 0 }, // Face 1
		{ x: Math.PI / 2, y: 0, z: 0 }, // Face 2
		{ x: Math.PI, y: 0, z: 0 }, // Face 3
		{ x: -Math.PI / 2, y: 0, z: 0 }, // Face 4
		{ x: 0, y: Math.PI / 2, z: 0 }, // Face 5
		{ x: 0, y: -Math.PI / 2, z: 0 }, // Face 6
		{ x: Math.PI / 4, y: Math.PI / 4, z: 0 }, // Face 7
		{ x: Math.PI / 4, y: Math.PI / 4, z: Math.PI / 4 }, // Face 8
		{ x: -Math.PI / 4, y: Math.PI / 4, z: -Math.PI / 4 }, // Face 9
		{ x: -Math.PI / 4, y: -Math.PI / 4, z: -Math.PI / 4 }, // Face 10
		{ x: Math.PI / 4, y: 0, z: Math.PI / 4 }, // Face 11
		{ x: -Math.PI / 4, y: 0, z: -Math.PI / 4 }, // Face 12
		{ x: 0, y: Math.PI / 4, z: Math.PI / 4 }, // Face 13
		{ x: 0, y: -Math.PI / 4, z: -Math.PI / 4 }, // Face 14
		{ x: Math.PI / 2, y: Math.PI / 4, z: 0 }, // Face 15
		{ x: -Math.PI / 2, y: -Math.PI / 4, z: 0 }, // Face 16
		{ x: Math.PI / 4, y: Math.PI / 2, z: 0 }, // Face 17
		{ x: -Math.PI / 4, y: -Math.PI / 2, z: 0 }, // Face 18
		{ x: Math.PI, y: Math.PI / 4, z: Math.PI / 4 }, // Face 19
		{ x: -Math.PI, y: -Math.PI / 4, z: -Math.PI / 4 }, // Face 20
	],
};
export const DIE_SHAPE_PROPERTIES: Record<
	SideCountOptions,
	{
		geo: (size: number) => BufferGeometry;
		trianglesPerFace: number;
		indexToNumber: number[];
	}
> = {
	4: {
		geo(size: number) {
			return new TetrahedronGeometry(size);
		},
		trianglesPerFace: 1,
		indexToNumber: [1, 4, 2, 3],
	},
	6: {
		geo(size: number) {
			return new BoxGeometry(size, size, size);
		},
		trianglesPerFace: 2,
		indexToNumber: [1, 6, 2, 5, 3, 4],
	},
	8: {
		geo(size: number) {
			return new OctahedronGeometry(size);
		},
		trianglesPerFace: 1,
		indexToNumber: [1, 6, 2, 5, 3, 4],
	},
	12: {
		geo(size: number) {
			return new DodecahedronGeometry(size);
		},
		trianglesPerFace: 3,
		indexToNumber: [1, 8, 2, 7, 3, 6, 4, 5],
	},
	20: {
		geo(size: number) {
			return new IcosahedronGeometry(size);
		},
		trianglesPerFace: 1,
		indexToNumber: [
			10, 8, 20, 2, 12, 16, 17, 15, 18, 14, 19, 1, 13, 11, 9, 3, 7, 5, 4, 6,
		],
	},
};

export const SIDE_COUNT_OPTIONS = [4, 6, 8, 12, 20];
