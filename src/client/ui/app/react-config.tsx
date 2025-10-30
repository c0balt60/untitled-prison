import type { ProfilerOnRenderCallback } from "@rbxts/react";

import { $NODE_ENV } from "rbxts-transform-env";

export function reactConfig(): void {
	if ($NODE_ENV !== "development") {
		return;
	}

	_G.__DEV__ = true;
	_G.__PROFILE__ = false;

	// Avoid implicit React import before setting the __DEV__ flag
	void import("client/ui/functions/profiler").then(({ profileAllComponents }) => {
		profileAllComponents();
	});
}

export async function createApp(): Promise<void> {
	// Avoid implicit React import before setting the __DEV__ flag
	// eslint-disable-next-line sonar/no-dead-store, flawless/naming-convention -- False positive
	const React = await import("@rbxts/react");

	const { App } = await import("client/ui/app/app");
	const { LoadingScreen } = await import("client/ui/app/loading-screen");
	const { mount } = await import("client/ui/functions");

	mount({ key: "app", children: <App /> });
	mount({ key: "loading-screen", children: <LoadingScreen /> });
}

export const onRenderProfiler: ProfilerOnRenderCallback = (
	...args: Parameters<ProfilerOnRenderCallback>
) => {
	const [id, phase, actualDuration, baseDuration, startTime, commitTime, interactions] = args;
	print(
		`id: ${id}, phase: ${phase}, actualDuration: ${actualDuration}, baseDuration: ${baseDuration}, startTime: ${startTime}, commitTime: ${commitTime}, interactions: ${interactions}`,
	);
};
