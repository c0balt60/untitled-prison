import type { ReactNode } from "@rbxts/react";
import React, { useContext, useEffect, useState } from "@rbxts/react";

import { Group } from "client/ui/components/primitive";
import { menuContext } from "client/ui/context";
import { useRem } from "client/ui/hooks";

import { HomeButton } from "./home-button";
import { TeamSelection } from "./team-selection";

// interface ButtonProps {
// 	Native?: Partial<React.InstanceProps<Frame>>;
// 	text?: string;
// }

interface MenuProps {
	barColor: Color3;
	text: string;
}

interface TeamProps extends MenuProps {
	layout: number;
}

interface HomeItemsProps {
	menuButtons: Array<MenuProps>;
	padding: UDim2;
	show?: boolean;
	teamButtons: Array<TeamProps>;
}

/** Default heights */
const DEFAULT_HEIGHT = 0.2;
// const DEFAULT_WIDTH = 0.625;
const MOUNT_DELAY = 0.15;
const UNMOUNT_DELAY = 0.15;

/**
 * Individual Item component
 */
// export function Item({ Native, text }: Readonly<ButtonProps>): ReactNode {
// 	return <HomeButton Native={Native} text={text} />;
// }

/**
 * HomeList component
 *
 * @param HomeItemProps - The properties for list component
 * @returns Home List component with buttons
 */
export function HomeList({
	menuButtons,
	padding,
	show = true,
	teamButtons,
}: Readonly<HomeItemsProps>): ReactNode {
	const rem = useRem();
	const context = useContext(menuContext);

	const [isMenuVisible, setIsMenuVisible] = useState<boolean>(show);
	const [isTeamVisible, setIsTeamVisible] = useState<boolean>(false);

	const menuClicked = (name: string): void => {
		switch (name) {
			case "Play": {
				setIsMenuVisible(false);
				task.delay(UNMOUNT_DELAY * menuButtons.size(), () => {
					setIsTeamVisible(true);
				});
			}
		}
	};

	useEffect(() => {
		setIsMenuVisible(show);
		setIsTeamVisible(false);
	}, [show]);

	useEffect(() => {
		context.show = show;
	}, [context, show]);

	// TODO: Implement horizontal and vertical options?
	return (
		<>
			<Group
				key="MenuButtons"
				Native={{
					AnchorPoint: new Vector2(0, 0),
					BorderSizePixel: 0,
					Position: UDim2.fromScale(0.125, 0.685),
					Size: UDim2.fromScale(0.334, 0.268),
				}}
			>
				{menuButtons.map((props: MenuProps, index: number) => {
					return (
						<HomeButton
							key={props.text}
							endPosition={rem(
								UDim2.fromScale(
									/* DEFAULT_WIDTH + padding.X.Scale * index, --> this is for horizontal components */
									0,
									DEFAULT_HEIGHT * (index + 1) + padding.Y.Scale * index,
								),
							)}
							holderColor={props.barColor}
							mountDelay={index * MOUNT_DELAY}
							show={isMenuVisible}
							text={props.text}
							unmountDelay={(menuButtons.size() - index) * UNMOUNT_DELAY}
							onClick={menuClicked}
						/>
					);
				})}
			</Group>
			<Group
				key="TeamButtons"
				Native={{
					AnchorPoint: new Vector2(0.5, 0.5),
					BorderSizePixel: 0,
					Position: UDim2.fromScale(0.5, 0.5),
					Size: UDim2.fromScale(0.825, 0.9),
				}}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.025, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				{teamButtons.map((props: TeamProps, index: number) => {
					print(index, props);
					return (
						<TeamSelection
							key={props.text}
							holderColor={props.barColor}
							layout={props.layout}
							mountDelay={index * MOUNT_DELAY * 1.5}
							show={isTeamVisible}
							text={props.text}
							unmountDelay={(teamButtons.size() - index) * UNMOUNT_DELAY * 0.85}
						/>
					);
				})}
			</Group>
		</>
	);
}
