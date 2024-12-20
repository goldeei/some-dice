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

export const DICE_SHAPE_BY_SIDE_COUNT: Record<
	number,
	{
		geo: new (...args: any[]) => BufferGeometry;
		trianglesPerFace: number;
	}
> = {
	// 2: {geo: }
	4: { geo: TetrahedronGeometry, trianglesPerFace: 1 },
	6: { geo: BoxGeometry, trianglesPerFace: 2 },
	8: { geo: OctahedronGeometry, trianglesPerFace: 1 },
	10: { geo: DodecahedronGeometry, trianglesPerFace: 3 },
	20: { geo: IcosahedronGeometry, trianglesPerFace: 1 },
};
