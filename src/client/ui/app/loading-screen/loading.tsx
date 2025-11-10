import { useMotion, useTimer } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import type { ReactNode } from "@rbxts/react";
import { ContentProvider, StarterGui, Workspace } from "@rbxts/services";
import { Environment } from "@rbxts/ui-labs";

import { DelayRender } from "../../components/delay-render";
import { LoadingRing } from "./loading-ring";

interface LoadingScreenProps {
	Loaded?: number;
	Visible?: boolean;
}

const DEFAULT_LOADTIME = 20;

export function LoadingScreen({
	Loaded = 0,
	Visible = true,
}: Readonly<LoadingScreenProps>): ReactNode {
	const timer = useTimer();

	const [isVisible, setIsVisible] = useState(Visible);

	const transparency = timer.value.map((time) => math.sin(time * 2.5) * 0.5 + 0.5);

	const [loadPercent, setLoadPercent] = useState(0);

	const [loadSpring, loadSpringApi] = useMotion(new UDim2());
	const [containerSpring, containerSpringApi] = useMotion(UDim2.fromScale(0.5, 0.5));
	const [scaleSpring, scaleSpringApi] = useMotion(1);

	const [loadingText, setLoadingText] = useState<string>("[0/0]");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoadPercent(Loaded);
		loadSpringApi.spring(UDim2.fromScale(loadPercent * 0.01, 1));
	}, [Loaded, loadSpringApi, setLoadPercent, loadPercent]);

	useEffect(() => {
		if (!isLoading) {
			return;
		}

		const loadTime = Promise.race<number>([
			Promise.try(() => {
				const start = os.clock();
				// Load data
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
				task.wait(5);
				return os.clock() - start;
				// return 5;
			}),
			Promise.delay(10),
		]);

		loadTime
			.andThen((elapsed) => {
				print(elapsed);
			})
			.catch((err) => {
				print(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [isLoading]);

	// Load in
	useEffect(() => {
		if (!isLoading) {
			return;
		}

		containerSpringApi.spring(UDim2.fromScale(0.5, 0.5));
		const after = task.delay(0.8, () => {
			scaleSpringApi.spring(1);
		});

		return () => {
			task.cancel(after);
		};
	}, [isLoading, containerSpringApi, scaleSpringApi]);

	// Complete loading
	useEffect(() => {
		if (isLoading) {
			return;
		}

		// Loadout
		scaleSpringApi.spring(0.825);

		const after = task.delay(0.8, () => {
			containerSpringApi.spring(UDim2.fromScale(0.5, 2));
		});

		return () => {
			task.cancel(after);
		};
	}, [isLoading, containerSpringApi, scaleSpringApi]);

	useEffect(() => {
		setIsLoading(Visible);
	}, [Visible]);

	return (
		<DelayRender ShouldRender={Visible} UnmountDelay={DEFAULT_LOADTIME + 3}>
			<frame
				key="LoadingFrame"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(10, 10, 10)}
				BorderSizePixel={0}
				Position={containerSpring}
				Size={UDim2.fromScale(1, 1)}
			>
				<uiscale Scale={scaleSpring} />

				<DelayRender MountDelay={1} ShouldRender={Visible}>
					<LoadingRing />
				</DelayRender>

				<frame
					key="Bar"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.325, 0.075)}
				>
					<uipadding PaddingLeft={new UDim(0.015, 0)} PaddingRight={new UDim(0.015, 0)} />

					<textlabel
						key="LoadingText"
						BackgroundTransparency={1}
						FontFace={
							new Font(
								"rbxasset://fonts/families/Montserrat.json",
								Enum.FontWeight.Regular,
								Enum.FontStyle.Normal,
							)
						}
						Position={UDim2.fromScale(0, 0.35)}
						Size={UDim2.fromScale(0.75, 0.3)}
						Text="Loading assets"
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<textlabel
						key="Percent"
						AnchorPoint={new Vector2(1, 0)}
						BackgroundTransparency={1}
						FontFace={
							new Font(
								"rbxasset://fonts/families/Montserrat.json",
								Enum.FontWeight.Regular,
								Enum.FontStyle.Normal,
							)
						}
						Position={UDim2.fromScale(1, 0.35)}
						Size={UDim2.fromScale(0.25, 0.3)}
						Text={string.format("%d%%", loadPercent)}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextXAlignment={Enum.TextXAlignment.Right}
					/>

					<frame
						key="LoadBar"
						BackgroundColor3={Color3.fromRGB(40, 40, 40)}
						Position={UDim2.fromScale(0, 0.8)}
						Size={UDim2.fromScale(1, 0.08)}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
						<uistroke Color={Color3.fromRGB(244, 244, 244)} Thickness={3}>
							<uigradient
								Transparency={
									new NumberSequence([
										new NumberSequenceKeypoint(0, 0.9),
										new NumberSequenceKeypoint(0.5, 1),
										new NumberSequenceKeypoint(1, 1),
									])
								}
							/>
						</uistroke>
						<frame key="Bar" BackgroundColor3={new Color3(1, 1, 1)} Size={loadSpring}>
							<uicorner CornerRadius={new UDim(1, 0)} />
						</frame>
					</frame>
				</frame>

				<frame
					key="Heading"
					AnchorPoint={new Vector2(0.5, 1)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.475)}
					Size={UDim2.fromScale(0.3, 0.085)}
				>
					<textlabel
						key="Header"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundTransparency={1}
						FontFace={
							new Font(
								"rbxasset://fonts/families/Montserrat.json",
								Enum.FontWeight.Bold,
								Enum.FontStyle.Normal,
							)
						}
						Position={UDim2.fromScale(0.5, 0)}
						Size={UDim2.fromScale(0.5, 0.5)}
						Text="Loading"
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
						TextTransparency={transparency}
					/>
					<textlabel
						key="Sub"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundTransparency={1}
						FontFace={
							new Font(
								"rbxasset://fonts/families/Montserrat.json",
								Enum.FontWeight.Regular,
								Enum.FontStyle.Normal,
							)
						}
						Position={UDim2.fromScale(0.5, 0.6)}
						Size={UDim2.fromScale(0.75, 0.25)}
						Text="Please wait while your experience loads"
						TextColor3={Color3.fromRGB(125, 125, 125)}
						TextScaled={true}
					/>
				</frame>
			</frame>
		</DelayRender>
	);
}
