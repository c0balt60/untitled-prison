import { createContext } from "@rbxts/react";

// eslint-disable-next-line flawless/naming-convention -- Interface naming convention
export interface IMenuContext {
	show: boolean;
}

// eslint-disable-next-line ts/no-non-null-assertion -- Disable for context
export const menuContext = createContext<IMenuContext>(undefined!);
