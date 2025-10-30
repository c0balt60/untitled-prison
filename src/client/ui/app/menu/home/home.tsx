import React from "@rbxts/react";

import { HomeList } from "./home-list";

interface HomeProps {
	show?: boolean;
}

export function Home({ show = true }: Readonly<HomeProps>): React.ReactNode {
	return (
		<HomeList
			key="HomeList"
			menuButtons={[
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
			teamButtons={[
				{
					barColor: Color3.fromRGB(217, 145, 0),
					layout: 1,
					text: "Prisoner",
				},
				{
					barColor: Color3.fromRGB(12, 96, 132),
					layout: 2,
					text: "Corrections Officer",
				},
				{
					barColor: Color3.fromRGB(200, 57, 44),
					layout: 3,
					text: "Emergency Team",
				},
				{
					barColor: Color3.fromRGB(71, 144, 66),
					layout: 4,
					text: "Warden",
				},
			]}
		/>
	);
}
