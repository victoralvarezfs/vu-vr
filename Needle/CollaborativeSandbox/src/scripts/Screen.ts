import { Behaviour, GameObject } from "@needle-tools/engine";

export class Screen extends Behaviour
{
	public UpdateVisible(active : boolean)
	{
		GameObject.setActive(this.gameObject, false);
	}
}