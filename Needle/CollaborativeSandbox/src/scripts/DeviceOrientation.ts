import { Behaviour } from "@needle-tools/engine";


export class DeviceOrientation extends Behaviour
{

    

	public orientation(orientation: string): string
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
}