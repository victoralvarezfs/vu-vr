import { Behaviour, GameObject, PlayerColor } from "@needle-tools/engine";

export class Avatar extends Behaviour {
  public avatar!: GameObject;
  public btnColor?: string;

  avatarColor?: PlayerColor | null;

  colorSelect(color: string) {
    this.btnColor = color;
  }

  onColorChange(color: string = this.btnColor!) {
    this.avatarColor = this.avatar.getComponentInChildren(PlayerColor);
    this.avatarColor!.assignUserColor(color);
  }
}
