import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import type { Logger } from "@rbxts/log";
import { RunService, Workspace } from "@rbxts/services";

const cinematicCameraParts = Workspace.WaitForChild("CameraParts");

@Controller({})
export class MenuController implements OnStart {
	private camera: Camera | undefined = undefined;
	private cinematicLoop: Promise<void> | undefined = undefined;

	constructor(private readonly logger: Logger) {}

	public onStart(): void {
		// TODO: Fix this camera logic
		// eslint-disable-next-line ts/no-non-null-assertion -- Deal with later
		this.camera = Workspace.CurrentCamera!;
	}

	public stopCinematicCamera(): void {
		if (!this.cinematicLoop) {
			return;
		}

		this.cinematicLoop.cancel();
	}

	public beginCinematicCamera(): void {
		this.cinematicLoop = new Promise<void>((_resolve, _reject, onCancel) => {
			// Loop through the camera parts
			let shouldLoop = true;
			let lastCam: BasePart | undefined;

			onCancel(() => {
				shouldLoop = false;
			});

			task.spawn(() => {
				// eslint-disable-next-line no-unmodified-loop-condition -- Redundant loop
				while (shouldLoop) {
					for (const object of cinematicCameraParts.GetChildren()) {
						const lerped = this.interpolateToPosition(object as BasePart, lastCam);
						lerped.await();
						lastCam = object as BasePart;
					}
				}
			});
		});
	}

	private async interpolateToPosition(
		to: BasePart,
		from: BasePart | undefined,
	): Promise<boolean | undefined> {
		return Promise.try<boolean | undefined>(() => {
			if (!this.camera) {
				return false;
			}

			if (!from) {
				this.camera.CFrame = to.CFrame;
				return true;
			}

			// Interpolate camera
			while (true) {
				RunService.RenderStepped.Wait();
				this.camera.CFrame = this.camera.CFrame.Lerp(to.CFrame, 0.1);
				if (this.camera.CFrame.Position.sub(to.Position).Magnitude <= 0.1) {
					break;
				}
			}

			return true;
		});
	}
}
