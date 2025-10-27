import React from "@rbxts/react";

import { useRem } from "client/ui/hooks";

interface HomeButtonProps {
	holderColor?: Color3;
	text?: string;
}

export function HomeButton({
	holderColor,
	text = "button",
}: Readonly<HomeButtonProps>): React.ReactNode {
	const rem = useRem();

	return (
		<frame
			AnchorPoint={new Vector2(0, 0)}
			BackgroundColor3={new Color3(1, 1, 1)}
			BackgroundTransparency={0}
			BorderSizePixel={0}
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
	);
}
