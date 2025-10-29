import { createContext } from "@rbxts/react";

// eslint-disable-next-line flawless/naming-convention -- Interface naming convention
export interface IMenuContext {
	/** Event for play button clicked */
	playClicked: () => void;
	/** Visibility of the main menu */
	show: boolean;
}

export const menuContext = createContext<IMenuContext>({
	playClicked: () => {
		/* empty */
	},
	show: true,
});
