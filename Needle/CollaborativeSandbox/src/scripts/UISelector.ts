import { Behaviour, serializable, GameObject, WebXR} from "@needle-tools/engine";
import { Object3D } from "three"
import { isMobileDevice, isiOS, isMozillaXR, isSafari, isQuest, getParam }
from "@needle-tools/engine/engine/engine_utils";

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

	data: string = "";
	enteredVR?: boolean = false;

	start()
	{
		console.log("**** test *****");
	}

	update()
	{		
		var devOrientation = this.orientation();
		this.switchUI(devOrientation);
	}

	orientation(): boolean
    {
        this.data = window.navigator.userAgent;
        var height = window.innerHeight; //window.screen.height * window.devicePixelRatio;
        var width = window.innerWidth;  //window.screen.width * window.devicePixelRatio;
		
        var orientation = false;

        if(width > height)
            orientation = false;
        else
            orientation = true;

        return orientation;
    }

	switchUI(portrait: boolean)
	{
		if(this.uiObjects != null)
		{
			if(!this.webxr.IsInVR)
			{
				GameObject.setActive(this.uiObjects[0]!, portrait);
				GameObject.setActive(this.uiObjects[1]!, !portrait);
				GameObject.setActive(this.uiObjects[2]!, false);
				if(this.enteredVR)
				{
					this.enteredVR = false;
				}
			}else
			{
				GameObject.setActive(this.uiObjects[0]!, false);
				GameObject.setActive(this.uiObjects[1]!, false);
				GameObject.setActive(this.uiObjects[2]!, true);
				if(!this.enteredVR)
				{
					this.enteredVR = true;
					// locate the UI on the players position
					this.setVRInstructions();
				}
			}			
		}
	}

	setVRInstructions()
	{
		//let p = parent.worldToLocal(position);
		console.log("//// SET VR INSTRUCTIONS");
		console.log("Antes: ", this.worldObject.position);
		var p = this.player.worldToLocal(this.player.position);
		//this.worldObject.position.set(p.x, p.y, p.z);
		this.worldObject.position.set(0,0,0);
		console.log("position ", this.worldObject.position);
	}

}