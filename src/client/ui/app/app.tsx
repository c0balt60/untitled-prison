import React from "@rbxts/react";

import { Layer } from "../components/primitive";
import { Menu } from "./menu";

export function App(): React.ReactNode {
	return (
		<>
			<Layer>
				<Menu />
			</Layer>

			<Layer key="example-layer" />

			<Layer key="example-layer1" />
		</>
	);
}
