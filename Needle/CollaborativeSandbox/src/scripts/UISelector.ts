import { Behaviour, serializable, GameObject, WebXR, Button, VRButton} from "@needle-tools/engine";
import { Object3D } from "three";
import { isMobileDevice, isiOS, isMozillaXR, isSafari, isQuest, getParam }
from "@needle-tools/engine/engine/engine_utils";

enum Platform {
  Desktop,
  Mobile,
  Quest
}

export class UISelector extends Behaviour
{
	@serializable(WebXR)
	webxr : WebXR;

	@serializable(Object3D) 
    player: Object3D;

	@serializable(GameObject) 
    worldObject: GameObject;

	@serializable(Object3D) 
    uiObjects: Object3D[] | null = null;

	//@serializable() 
    mobileUIs: UIScreen[] | null = null;

	data: string = "";
	enteredVR?: boolean = false;

	platform: Platform = null;	

	@serializable()
	_vrButton?: Button;

	@serializable
	currentScreen:number = 0;

	start()
	{
		if(this.uiObjects.Length < 4) 
		{
			console.log("Assign the ui objects");
			return;
		}
		this.data = window.navigator.userAgent;
		console.log("user agent: "+window.navigator.userAgent);
		console.log("is mobile device: ",isMobileDevice());
		console.log("is Mozilla XR: ",isMozillaXR());
		console.log("is quest: ",isQuest());				
	}

	onEnable()
	{
		this.checkPlatform();
	}

	async checkPlatform()
	{
		const sleep = (ms) => new Promise(r => setTimeout(r,ms));
		await sleep(1000);
		GameObject.setActive(this.uiObjects[0]!, false);
		GameObject.setActive(this.uiObjects[1]!, false);
		GameObject.setActive(this.uiObjects[2]!, false);
		GameObject.setActive(this.uiObjects[3]!, false);

		if(isMobileDevice())
		{
			if(isQuest())
			{
				// Oculus Quest
				if(!this.webxr.IsInVR)
				{
					// Displays "Enter VR" Button
					this._vrButton = document.getElementById('VRButton');
					if(this._vrButton != null)
					{
						this._vrButton.addEventListener('click', this.clickedEnterVR);
					}
					// Turn off Quest instructions
					this.platform = Platform.Quest;
				}
			}
			else
			{
				// Mobile 
				this.platform = Platform.Mobile;
				// Check device orientation
				this.checkOrientation();
			}
		}else
		{
			// Desktop
			this.platform = Platform.Desktop;
			GameObject.setActive(this.uiObjects[0]!, true);
		}
	}

	update()
	{		
		//var devOrientation = this.orientation();
		if(this.platform == Platform.Mobile) this.checkOrientation();
		if(this.platform == Platform.Quest && this.webxr.IsInVR && !this.enteredVR) this.setVRInstructions();
		//this.switchUI(devOrientation);
	}

	orientation(): boolean
    {
		//console.log("current platform: ", this.platform);
		if(this.platform == 1)
		{
        this.data = window.navigator.userAgent;
        var height = window.innerHeight; //window.screen.height * window.devicePixelRatio;
        var width = window.innerWidth;  //window.screen.width * window.devicePixelRatio;
		
        var orientation = false;

        if(height > width)
            return true;
        else
            return false;
		}
		else return false;
    }

	checkOrientation()
	{
		var portrait = this.orientation();
		GameObject.setActive(this.uiObjects[1]!, portrait);
		GameObject.setActive(this.uiObjects[2]!, !portrait);		
	}
	
	clickedEnterVR()
	{
		console.log("ya no se hace nada");
		//UISelector.setVRInstructions;
	}

	setVRInstructions()
	{
		this.enteredVR = true;
		//var p = this.player.worldToLocal(this.player.position);
		this.worldObject.position.set(0,0,0);
		GameObject.setActive(this.worldObject, true);
	}
}