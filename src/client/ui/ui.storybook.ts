import React from "@rbxts/react";

interface Storybook {
	name: string;
	react?: typeof React;
	storyRoots: Array<Instance | undefined>;
}

export = identity<Storybook>({
	name: "Main interface",
	react: React,
	storyRoots: [script.Parent],
});
