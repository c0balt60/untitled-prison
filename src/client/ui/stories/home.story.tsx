import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Boolean, type InferProps } from "@rbxts/ui-labs";

import { Home } from "../app/menu/home";

const controls = {
	Visible: Boolean(true),
};

const app = {
	controls,
	react: React,
	reactRoblox: ReactRoblox,
	story: (props: InferProps<typeof controls>): React.ReactNode => {
		return <Home show={props.controls.Visible} />;
	},
};

export = app;
