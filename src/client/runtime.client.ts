import { Flamework, Modding } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";

import { GAME_NAME } from "shared/constants/game";
import { setupLogger } from "shared/functions/setup-logger";

import { createApp, reactConfig } from "./ui/app/react-config";

function start(): void {
	reactConfig();
	setupLogger();

	Log.Info(`${GAME_NAME} on client! Version: ${game.PlaceVersion}`);

	Modding.registerDependency<Logger>((ctor) => Log.ForContext(ctor));

	Flamework.addPaths("src/client");

	Log.Info("Flamework ignited.");
	Flamework.ignite();

	createApp().catch(() => {
		Log.Fatal("Failed to create react app.");
	});
}

start();
