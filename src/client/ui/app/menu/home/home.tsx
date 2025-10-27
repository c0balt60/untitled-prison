import React from "@rbxts/react";

import { DelayRender } from "client/ui/components/delay-render";
import { Group } from "client/ui/components/primitive";
import { useRem } from "client/ui/hooks";

import { HomeButton } from "./home-button";

export function Home(): React.ReactNode {
	const rem = useRem();

	return (
		<Group
			Native={{
				AnchorPoint: new Vector2(0, 0),
				BorderSizePixel: 0,
				Position: UDim2.fromScale(0.03, 0.685),
				Size: UDim2.fromScale(0.334, 0.268),
			}}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, rem(1))}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<DelayRender MountDelay={1} ShouldRender={true}>
				<HomeButton holderColor={Color3.fromRGB(9, 77, 149)} text="Play" />
			</DelayRender>
			<HomeButton holderColor={Color3.fromRGB(149, 1, 1)} text="Help & FAQs" />
			<HomeButton holderColor={Color3.fromRGB(82, 149, 10)} text="Credits" />
		</Group>
	);
}
