import { Behaviour, serializeable } from "@needle-tools/engine";
import { Object3D } from "three"

export class lookAtObject extends Behaviour {

    @serializeable(Object3D)
    otherObject?: Object3D;

    update() {
        if (this.otherObject)
            this.gameObject.lookAt(this.otherObject.position)
    }
}