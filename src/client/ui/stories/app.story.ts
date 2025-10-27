import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Boolean, type InferProps } from "@rbxts/ui-labs";

import { App } from "../app/app";

const controls = {
	Visible: Boolean(true),
};

const app = {
	controls,
	react: React,
	reactRoblox: ReactRoblox,
	story: (_props: InferProps<typeof controls>): React.ReactNode => App(),
};

export = app;
