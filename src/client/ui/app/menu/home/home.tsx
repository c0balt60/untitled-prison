import React from "@rbxts/react";

import { HomeList } from "./home-list";

interface HomeProps {
	show?: boolean;
}

export function Home({ show = true }: Readonly<HomeProps>): React.ReactNode {
	return (
		<HomeList
			items={[
				{
					barColor: Color3.fromRGB(9, 77, 149),
					text: "Play",
				},
				{
					barColor: Color3.fromRGB(149, 1, 1),
					text: "Help & FAQs",
				},
				{
					barColor: Color3.fromRGB(82, 149, 10),
					text: "Credits",
				},
			]}
			padding={UDim2.fromScale(0, 0.05)}
			show={show}
		/>
	);
}
