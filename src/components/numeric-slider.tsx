import { SliderProps } from "@radix-ui/react-slider";

import { Slider } from "./ui/slider";

type NumericSliderProps = SliderProps & {
	onValueChange: (v: number) => void;
};
export const NumericSlider = ({
	onValueChange,
	value,
	...props
}: NumericSliderProps) => {
	const handleValueChange = (v: number[]) => {
		onValueChange?.(v[0]);
	};

	return <Slider {...props} value={value} onValueChange={handleValueChange} />;
};
