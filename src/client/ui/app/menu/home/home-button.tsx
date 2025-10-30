import { useMotion } from "@rbxts/pretty-react-hooks";
import type { ReactNode } from "@rbxts/react";
import React, { useEffect, useState } from "@rbxts/react";
import { setTimeout } from "@rbxts/set-timeout";

import { DelayRender } from "client/ui/components/delay-render";
import { Button } from "client/ui/components/primitive";
import { useRem } from "client/ui/hooks";

interface HomeButtonProps {
	endPosition: UDim2;
	holderColor?: Color3;
	mountDelay?: number;
	onClick?: (name: string) => void;
	show?: boolean;
	text?: string;

	unmountDelay?: number;
}

const OFF_POSITION = UDim2.fromScale(0, 1.5);
const DEFAULT_SIZE = UDim2.fromScale(0.635, 0.2);

export function HomeButton({
	endPosition,
	holderColor,
	mountDelay = 0,
	onClick,
	show = true,
	text = "button",

	unmountDelay = 0,
}: Readonly<HomeButtonProps>): ReactNode {
	const rem = useRem();

	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const [size, sizeMotion] = useMotion(DEFAULT_SIZE);
	const [popupPosition, popupPositionMotion] = useMotion(OFF_POSITION);

	useEffect(() => {
		setIsVisible(!!show);
	}, [show]);

	useEffect(() => {
		sizeMotion.spring(isHovered ? new UDim2(0.635, rem(0.4), 0.2, rem(0.4)) : DEFAULT_SIZE, {
			friction: 12,
			mass: 1,
			tension: 400,
		});
	});

	useEffect(() => {
		const delay = show ? mountDelay : unmountDelay;

		return setTimeout((): void => {
			popupPositionMotion.spring(show ? endPosition : OFF_POSITION, {
				friction: 10,
				mass: 0.75,
				tension: 100,
			});
		}, delay);
	}, [popupPositionMotion, endPosition, mountDelay, unmountDelay, show]);

	return (
		<DelayRender ShouldRender={isVisible} UnmountDelay={2}>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0}
				BorderSizePixel={0}
				Event={{
					MouseEnter: () => {
						setIsHovered(true);
					},
					MouseLeave: () => {
						setIsHovered(false);
					},
				}}
				Position={popupPosition}
				Size={size}
				ZIndex={isHovered ? 2 : 1}
			>
				<uipadding PaddingRight={new UDim(0, rem(1))} />
				<Button
					key="trigger"
					Native={{
						BackgroundTransparency: 1,
						Size: UDim2.fromScale(1, 1),
						ZIndex: 10,
					}}
					onMouseDown={() => {
						sizeMotion.spring(DEFAULT_SIZE, {
							friction: 7,
							mass: 1.2,
							tension: 800,
						});
					}}
					onMouseUp={() => {
						onClick?.(text);
						sizeMotion.spring(new UDim2(0.635, rem(0.7), 0.2, rem(0.7)), {
							friction: 10,
							mass: 0.8,
							tension: 600,
						});
					}}
				/>
				<textlabel
					key="header"
					AnchorPoint={new Vector2(1, 0.5)}
					BackgroundTransparency={1}
					FontFace={
						new Font(
							"rbxasset://fonts/families/Montserrat.json",
							Enum.FontWeight.SemiBold,
							Enum.FontStyle.Normal,
						)
					}
					Position={UDim2.fromScale(1, 0.5)}
					Size={UDim2.fromScale(0.65, 0.725)}
					Text={text}
					TextColor3={new Color3(0, 0, 0)}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Right}
				/>
				<frame
					key="holder"
					BackgroundColor3={holderColor}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0, 0)}
					Size={UDim2.fromScale(0.065, 1)}
				/>
			</frame>
		</DelayRender>
	);
}
