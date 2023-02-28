import { Behaviour, serializable, GameObject} from "@needle-tools/engine";
import { Object3D } from "three"

export class UISelector extends Behaviour
{
	@serializable(Object3D) 
    uiObjects: Object3D[] | null = null;

	data: string = "";

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
		if(this.uiObjects[0] != null && this.uiObjects[1] != null)
		{
		GameObject.setActive(this.uiObjects[0]!, portrait);
		GameObject.setActive(this.uiObjects[1]!, !portrait);
		}
	}

}