import { TypedArray } from "three";
import { Vector } from "three/examples/jsm/Addons.js";

import { IntRange } from "./utils";

// ROTATION
export type RotationMinMax = IntRange<0, 360>;
export type RotationArray = [RotationMinMax, RotationMinMax, RotationMinMax];

// POSITION
export type PositionArray = [number, number, number];

// FACES
export type FaceAttributes = { id: number; centerPos: Vector };

type FaceGetterParams = [
	vertsPerFace: number,
	positions: TypedArray,
	faces: FaceAttributes[]
];
export type FaceGetterFunction<T extends "indexed" | "non-indexed"> =
	T extends "indexed"
		? (indices: TypedArray, ...rest: FaceGetterParams) => void
		: (...rest: FaceGetterParams) => void;
