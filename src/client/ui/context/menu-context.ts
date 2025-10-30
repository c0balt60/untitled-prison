import { createContext } from "@rbxts/react";

// eslint-disable-next-line flawless/naming-convention -- Interface naming convention
export interface IMenuContext {
	/** Determines whether the loading is complete or not */
	loaded: boolean;
	/** Set the visibility of the menu */
	show: boolean;
}

export const menuContext = createContext<IMenuContext>({
	loaded: false,
	show: false,
});
