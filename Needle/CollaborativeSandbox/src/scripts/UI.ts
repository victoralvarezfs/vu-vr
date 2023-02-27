import { isMobileDevice, isiOS, isMozillaXR, isSafari, isQuest}
from "@needle-tools/engine/engine/engine_utils";
import { Behaviour, Canvas, serializable, serializeable, GameObject, RectTransform, EventList } from "@needle-tools/engine";
import { Object3D } from "three"


export class UI extends Behaviour
{
    /*
    @serializable(EventList) 
    myEventReferenceList: EventList[] | null = null;

    @serializeable(Object3D)
    test?: Object3D;
    */
    @serializable(Object3D) 
    myObjectReferenceList: Object3D[] | null = null;

	start()
    {
        //GameObject.setActive(this.myObjectReferenceList[1],true); this works
        this.myfunction(0);
    }

    public turnThisScreen(on: bool)
    {
        GameObject.setActive(value, on);
    }

    private myfunction(screen : number)
    {
        this.myObjectReferenceList.forEach(function (value) 
        {
          console.log(value);
          GameObject.setActive(value, true);
        }); 
    }

}