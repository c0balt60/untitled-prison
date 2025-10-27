import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { setTimeout } from "@rbxts/set-timeout";

import { DelayRender } from "client/ui/components/delay-render";
import { useRem } from "client/ui/hooks";

interface HomeButtonProps {
	endPosition: UDim2;
	holderColor?: Color3;
	mountDelay?: number;
	show?: boolean;
	text?: string;
	unmountDelay?: number;
}

export function HomeButton({
	endPosition,
	holderColor,
	mountDelay = 0,
	show = true,
	text = "button",
	unmountDelay = 0,
}: Readonly<HomeButtonProps>): React.ReactNode {
	const rem = useRem();
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const [popupPosition, popupPositionMotion] = useMotion(
		UDim2.fromScale(endPosition.X.Scale, 1.25),
	);

	useEffect(() => {
		setIsVisible(!!show);
	}, [show]);

	useEffect(() => {
		const delay = show ? mountDelay : unmountDelay;

		return setTimeout((): void => {
			popupPositionMotion.spring(endPosition, {
				friction: 10,
				mass: 0.75,
				tension: 100,
			});
		}, delay);
	}, [popupPositionMotion, endPosition, mountDelay, unmountDelay, show]);

	return (
		<DelayRender ShouldRender={isVisible} UnmountDelay={unmountDelay}>
			<frame
				AnchorPoint={new Vector2(0, 0)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={0}
				BorderSizePixel={0}
				Position={popupPosition}
				Size={UDim2.fromScale(0.635, 0.2)}
			>
				<uipadding PaddingRight={new UDim(0, rem(1))} />
				<textlabel
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
					Size={UDim2.fromScale(0.25, 0.875)}
					Text={text}
					TextColor3={new Color3(0, 0, 0)}
					TextSize={rem(1.5)}
					TextXAlignment={Enum.TextXAlignment.Right}
				/>
				<frame
					BackgroundColor3={holderColor}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0, 0)}
					Size={UDim2.fromScale(0.065, 1)}
				/>
			</frame>
		</DelayRender>
	);
}
