"use client";
import React, { createContext, useEffect, useState } from "react";

type DiceRollingState = {
	isFresh: boolean;
	isRolling: boolean;
	didRollFinish: boolean;
	rollResult: { [key: string]: number };
};

const defaultRollState: DiceRollingState = {
	isFresh: true,
	isRolling: false,
	didRollFinish: false,
	rollResult: {},
};

export const RollContext = createContext<{
	currentRollState: DiceRollingState;
	setCurrentRollState: React.Dispatch<DiceRollingState>;
}>({
	currentRollState: defaultRollState,
	setCurrentRollState: () => {},
});
export const RollContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currentRollState, setCurrentRollState] = useState<DiceRollingState>({
		isFresh: true,
		isRolling: false,
		didRollFinish: false,
		rollResult: {},
	});

	useEffect(() => {
		console.table(currentRollState);
	}, [currentRollState]);

	return (
		<RollContext value={{ currentRollState, setCurrentRollState }}>
			{children}
		</RollContext>
	);
};
