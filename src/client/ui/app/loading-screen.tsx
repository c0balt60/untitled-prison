import React, { useEffect, useState } from "@rbxts/react";
import type { ReactNode } from "@rbxts/react";
import { ContentProvider, StarterGui, Workspace } from "@rbxts/services";
import { Environment } from "@rbxts/ui-labs";

import { DelayRender } from "../components/delay-render";
import { Layer } from "../components/primitive";
import { useRem } from "../hooks";

export function LoadingScreen(): ReactNode {
	const rem = useRem();

	const [loadingText, setLoadingText] = useState<string>("[0/0]");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const loadTime = Promise.race<number>([
		Promise.try(() => {
			// Load data
			task.wait(5);
			return 5;
		}),
		Promise.delay(10),
	]);

	loadTime
		.finally(() => {
			setIsLoading(false);
		})
		.catch((err) => {
			print(err);
		});

	// Load in world
	useEffect(() => {
		const load = new Promise<void>((resolve) => {
			if (Environment.IsStory()) {
				for (const object of StarterGui.GetDescendants()) {
					task.wait(0.05);
					setLoadingText(object.Name);
				}

				resolve();
				return;
			}

			ContentProvider.PreloadAsync(
				Workspace.GetDescendants(),
				(contentId: string, status: Enum.AssetFetchStatus) => {
					task.wait(0.05);
					print("Loading: ", contentId, status);
					setLoadingText(contentId);
				},
			);
		});

		void load.andThen(() => {
			setLoadingText("completed");
		});

		return () => {
			load.cancel();
		};
	}, []);

	return (
		<Layer>
			<DelayRender ShouldRender={isLoading} UnmountDelay={10}>
				<canvasgroup
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
						AnchorPoint={new Vector2(1, 0.5)}
						BackgroundTransparency={1}
						Position={UDim2.fromScale(0.75, 0.8)}
						Size={UDim2.fromScale(0.1, 0.15)}
						Text="Loading: "
						TextColor3={new Color3(1, 1, 1)}
						TextSize={rem(0.75)}
						TextXAlignment={Enum.TextXAlignment.Right}
					/>
					<textlabel
						AnchorPoint={new Vector2(0, 0.5)}
						BackgroundTransparency={1}
						Position={UDim2.fromScale(0.75, 0.8)}
						Size={UDim2.fromScale(0.2, 0.15)}
						Text={loadingText}
						TextColor3={new Color3(1, 1, 1)}
						TextSize={rem(0.75)}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
				</canvasgroup>
			</DelayRender>
		</Layer>
	);
}
