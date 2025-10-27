import React from "@rbxts/react";

import { Group } from "client/ui/components/primitive";

import { Home } from "./home";

export function Menu(): React.ReactNode {
	return (
		<Group>
			<Home />
		</Group>
	);
}
