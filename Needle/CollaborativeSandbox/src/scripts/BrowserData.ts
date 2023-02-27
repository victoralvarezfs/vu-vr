import { Behaviour, GameObject, Canvas, serializable, serializeable } from "@needle-tools/engine";
import { isMobileDevice, isiOS, isMozillaXR, isSafari, isQuest, getParam }
from "@needle-tools/engine/engine/engine_utils";

export class BrowserData extends Behaviour
{
    /// FIELDS AND PROPERTIES    

    @serializable()
    APIEndpointUrl?: string;

    // "lobby" or "360"
    @serializable()
    room?: string;

    // read from url and used as a parameter for the request
    event_id?: string;
    
    // data obtained in the response
    lobbyUrl?: string;
    livestreamSources?: string[] | null = null;



	awake()
    {
        const urlParam = getParam("room");
        if(urlParam && typeof urlParam === "string" && urlParam.length > 0)
        {
            console.log("\\\\\\ url param: ", urlParam);
        }
        //console.log("=> orientation:", orientation());
    }

    update()
    {
        
    }

    /// PUBLIC METHODS

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

    /// PRIVATE METHODS

    

    getEventId()
    {
        const urlParam = getParam("room");
        if(urlParam && typeof urlParam === "string" && urlParam.length > 0)
        {
            console.log("\\\\\\ url param: ", urlParam);
            this.event_id = urlParam;
        }
    }

}