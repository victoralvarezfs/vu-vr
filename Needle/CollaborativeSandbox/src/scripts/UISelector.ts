import { Behaviour, serializable, GameObject} from "@needle-tools/engine";
import { Object3D } from "three"

export class UISelector extends Behaviour
{
	@serializable(Object3D) 
    uiObjects: Object3D[] | null = null;

	update()
	{		
		var devOrientation = this.orientation();
		var string1 = "portrait";
		let portrait: boolean = string1 === devOrientation;
		this.switchUI(portrait);
	}

	orientation(orientation: string): string
    {
        this.data = window.navigator.userAgent;
        var height = window.innerHeight; //window.screen.height * window.devicePixelRatio;
        var width = window.innerWidth;  //window.screen.width * window.devicePixelRatio;
        var orientation = "";
        if(width > height)
            orientation = "Landscape";
        else
            orientation = "Portrait";
        return orientation;
    }

	switchUI(portrait: boolean)
	{
		if(portrait)
		{
			GameObject.setActive(this.uiObjects[0], true);
			GameObject.setActive(this.uiObjects[1], false);
		}else
		{
			GameObject.setActive(this.uiObjects[1], true);
			GameObject.setActive(this.uiObjects[0], false);
		}
	}

}