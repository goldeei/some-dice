"use client";
import { SideCount } from "@/types";
import React, { createContext, useState } from "react";

type DiceProps = {
	sides: SideCount;
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
