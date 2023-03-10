import { Behaviour, GameObject, PlayerColor } from "@needle-tools/engine";

export class AvatarChange extends Behaviour {
  public avatar!: GameObject;
  public btnColor?: string;

  colorSelect(color: string) {
    this.btnColor = color;
  }

  onColorChange(color: string = this.btnColor!) {
    this.avatar.getComponentInChildren(PlayerColor)!.assignUserColor(color);
  }
}
