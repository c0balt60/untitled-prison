import type { ReactNode } from "@rbxts/react";
import React, { useRef } from "@rbxts/react";

import { Group } from "client/ui/components/primitive";
import { useRem } from "client/ui/hooks";

import { HomeButton } from "./home-button";

// interface ButtonProps {
// 	Native?: Partial<React.InstanceProps<Frame>>;
// 	text?: string;
// }

interface ItemProps {
	barColor: Color3;
	text: string;
}

interface HomeItemsProps {
	items: Array<ItemProps>;
	padding: UDim2;
	show?: boolean;
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
export function HomeList({ items, padding, show }: Readonly<HomeItemsProps>): ReactNode {
	const rem = useRem();

	// TODO: Implement horizontal and vertical options?
	return (
		<Group
			key="HomeList"
			Native={{
				AnchorPoint: new Vector2(0, 0),
				BorderSizePixel: 0,
				Position: UDim2.fromScale(0.125, 0.685),
				Size: UDim2.fromScale(0.334, 0.268),
			}}
		>
			{items.map((props: ItemProps, index: number) => {
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
						show={show}
						text={props.text}
						unmountDelay={(items.size() - index) * UNMOUNT_DELAY}
					/>
				);
			})}
		</Group>
	);
}
