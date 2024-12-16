import { IntRange } from "./utils";

// ROTATION
export type RotationMinMax = IntRange<0, 360>;
export type RotationArray = [RotationMinMax, RotationMinMax, RotationMinMax];

// POSITION
export type PositionArray = [number, number, number];
