import { useMotion } from "@rbxts/pretty-react-hooks";
import type { ReactNode } from "@rbxts/react";
import React, { useEffect, useState } from "@rbxts/react";
import { setTimeout } from "@rbxts/set-timeout";

import { DelayRender } from "client/ui/components/delay-render";
import { Button } from "client/ui/components/primitive";
import { useRem } from "client/ui/hooks";

interface TeamSelectionProps {
	holderColor: Color3;
	layout: number;
	mountDelay?: number;
	show?: boolean;
	text: string;
	unmountDelay?: number;
}

const DEFAULT_SIZE = UDim2.fromScale(0.23, 0.75);
const OFF_POSITION = UDim2.fromScale(0.5, -0.5 - DEFAULT_SIZE.Y.Scale);

export function TeamSelection({
	holderColor,
	layout,
	mountDelay = 0,
	show = false,
	text,
	unmountDelay = 3,
}: Readonly<TeamSelectionProps>): ReactNode {
	const rem = useRem();
	const [isVisible, setIsVisible] = useState<boolean>(show);

	const [popupPosition, popupPositionMotion] = useMotion(OFF_POSITION);

	useEffect(() => {
		setIsVisible(!!show);
	}, [show]);

	useEffect(() => {
		const delay = show ? mountDelay : unmountDelay;

		return setTimeout((): void => {
			popupPositionMotion.spring(show ? UDim2.fromScale(0.5, 0.5) : OFF_POSITION, {
				friction: 10,
				mass: 0.75,
				tension: 100,
			});
		}, delay);
	}, [popupPositionMotion, mountDelay, unmountDelay, show]);

	return (
		<DelayRender ShouldRender={isVisible} UnmountDelay={5}>
			<frame
				key={"wrapper-%s".format(text)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				LayoutOrder={layout}
				Size={DEFAULT_SIZE}
			>
				<frame
					key="main"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={new Color3(1, 1, 1)}
					Position={popupPosition}
					Size={UDim2.fromScale(1, 1)}
				>
					<textlabel
						key="team-name"
						BackgroundColor3={holderColor}
						BorderSizePixel={0}
						FontFace={
							new Font(
								"rbxasset://fonts/families/Montserrat.json",
								Enum.FontWeight.SemiBold,
								Enum.FontStyle.Normal,
							)
						}
						Position={UDim2.fromScale(0, 0.9)}
						Size={UDim2.fromScale(1, 0.1)}
						Text={text}
						TextColor3={new Color3(1, 1, 1)}
						TextScaled={true}
					/>
					<frame
						key="button"
						BackgroundColor3={new Color3(1, 1, 1)}
						Position={UDim2.fromScale(0, 1.05)}
						Size={UDim2.fromScale(1, 0.1)}
					>
						<uipadding PaddingLeft={new UDim(0.1, 0)} />
						<Button
							key="trigger"
							Native={{
								BackgroundTransparency: 1,
								Size: UDim2.fromScale(1, 1),
								ZIndex: 10,
							}}
							// onMouseDown={() => {
							// 	sizeMotion.spring(DEFAULT_SIZE, {
							// 		friction: 7,
							// 		mass: 1.2,
							// 		tension: 800,
							// 	});
							// }}
							// onMouseUp={() => {
							// sizeMotion.spring(new UDim2(0.635, rem(0.7), 0.2,
							// rem(0.7)), { friction: 10, mass: 0.8, tension:
							// 600, }); }}
						/>
						<textlabel
							key="header"
							AnchorPoint={new Vector2(0, 0.5)}
							BackgroundTransparency={1}
							FontFace={
								new Font(
									"rbxasset://fonts/families/Montserrat.json",
									Enum.FontWeight.SemiBold,
									Enum.FontStyle.Normal,
								)
							}
							Position={UDim2.fromScale(0, 0.5)}
							Size={UDim2.fromScale(0.25, 0.875)}
							Text={text}
							TextColor3={new Color3(0, 0, 0)}
							TextSize={rem(1.5)}
							TextXAlignment={Enum.TextXAlignment.Left}
						/>
						<frame
							key="holder"
							AnchorPoint={new Vector2(1, 0)}
							BackgroundColor3={holderColor}
							BorderSizePixel={0}
							Position={UDim2.fromScale(1, 0)}
							Size={UDim2.fromScale(0.065, 1)}
						/>
					</frame>
				</frame>
			</frame>
		</DelayRender>
	);
}
