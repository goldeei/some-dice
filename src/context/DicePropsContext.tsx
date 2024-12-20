"use client";
import { SideCountOptions } from "@/types";
import React, { createContext, useState } from "react";

type DiceProps = {
	sides: SideCountOptions;
};

const defaultDiceProps: DiceProps = {
	sides: 6,
};

export const DicePropsContext = createContext<{
	currentDiceProps: DiceProps;
	setCurrentDiceProps: React.Dispatch<DiceProps>;
}>({
	currentDiceProps: defaultDiceProps,
	setCurrentDiceProps: () => {},
});
export const DicePropsContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currentDiceProps, setCurrentDiceProps] =
		useState<DiceProps>(defaultDiceProps);

	return (
		<DicePropsContext value={{ currentDiceProps, setCurrentDiceProps }}>
			{children}
		</DicePropsContext>
	);
};
