import React, { useEffect, useState } from "@rbxts/react";
import type { ReactNode } from "@rbxts/react";
import { ContentProvider, Workspace } from "@rbxts/services";

import { DelayRender } from "../components/delay-render";
import { Layer } from "../components/primitive";

export function LoadingScreen(): ReactNode {
	const [loadingText, setLoadingText] = useState<string>("loading: [0/0] ~ workspace");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const load = Promise.race<number>([
		Promise.try(() => {
			// Load data
			task.wait(5);
			return 5;
		}),
		Promise.delay(10),
	]);

	load.finally(() => {
		setIsLoading(false);
		// eslint-disable-next-line unicorn/catch-error-name -- Unnecessary lint rul
	}).catch((reason) => {
		print(reason);
	});

	// Load in world
	useEffect(() => {
		ContentProvider.PreloadAsync(
			Workspace.GetDescendants(),
			(contentId: string, status: Enum.AssetFetchStatus) => {
				print("Loading: ", contentId, status);
				setLoadingText(string.format("loading: [%s] ~ workspace", contentId));
			},
		);
	});

	return (
		<Layer>
			<DelayRender ShouldRender={isLoading} UnmountDelay={10}>
				<frame
					key="LoadingContainer"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(25, 25, 25)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 1)}
					BorderSizePixel={0}
					// !isLoading ? UDim2.fromScale(0.5, 0.5) :
					// UDim2.fromScale(0.5, 2)}
				>
					<textlabel
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						Text={loadingText}
						TextColor3={new Color3(1, 1, 1)}
					/>
				</frame>
			</DelayRender>
		</Layer>
	);
}
