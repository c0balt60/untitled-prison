import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Boolean, type InferProps, Slider } from "@rbxts/ui-labs";

import { LoadingScreen } from "../app/loading-screen";

const controls = {
	Loading: Slider(0, 0, 100, 1),
	Visible: Boolean(true),
};

const app = {
	controls,
	react: React,
	reactRoblox: ReactRoblox,
	story: (props: InferProps<typeof controls>): React.ReactNode => {
		return <LoadingScreen Loaded={props.controls.Loading} Visible={props.controls.Visible} />;
	},
};

export = app;
