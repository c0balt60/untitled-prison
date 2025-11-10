import { useTimer } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import type { ReactNode } from "@rbxts/react";

import { DelayRender } from "client/ui/components/delay-render";

export function LoadingRing(): ReactNode {
	const timer = useTimer();
	const spin = timer.value.map((time) => 360 * time);

	return (
		<DelayRender ShouldRender={true} UnmountDelay={10}>
			<frame
				key="RingContainer"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.2)}
				Size={UDim2.fromScale(1, 0.16)}
			>
				<uiaspectratioconstraint
					AspectRatio={1}
					AspectType={Enum.AspectType.FitWithinMaxSize}
				/>
				<frame
					key="ProgressBar"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 1)}
				>
					<frame
						key="Left"
						BackgroundTransparency={1}
						ClipsDescendants={true}
						Size={UDim2.fromScale(0.5, 1)}
					>
						<imagelabel
							BackgroundTransparency={1}
							Image="rbxasset://textures/ui/Controls/RadialFill.png"
							Size={UDim2.fromScale(2, 1)}
						>
							<uigradient
								Rotation={spin.map((value) => value + 180)}
								Transparency={
									new NumberSequence([
										new NumberSequenceKeypoint(0, 0),
										new NumberSequenceKeypoint(0.5, 0),
										new NumberSequenceKeypoint(0.501, 1),
										new NumberSequenceKeypoint(1, 1),
									])
								}
							/>
						</imagelabel>
					</frame>
					<frame
						key="Right"
						BackgroundTransparency={1}
						ClipsDescendants={true}
						Position={UDim2.fromScale(0.5, 0)}
						Size={UDim2.fromScale(0.5, 1)}
					>
						<imagelabel
							BackgroundTransparency={1}
							Image="rbxasset://textures/ui/Controls/RadialFill.png"
							Position={UDim2.fromScale(-1, 0)}
							ScaleType={Enum.ScaleType.Fit}
							Size={UDim2.fromScale(2, 1)}
						>
							<uigradient
								Rotation={spin.map((value) => value)}
								Transparency={
									new NumberSequence([
										new NumberSequenceKeypoint(0, 0),
										new NumberSequenceKeypoint(0.5, 0),
										new NumberSequenceKeypoint(0.501, 1),
										new NumberSequenceKeypoint(1, 1),
									])
								}
							/>
						</imagelabel>
					</frame>
				</frame>
			</frame>
		</DelayRender>
	);
}
