import { GameObject, Behaviour, PlayerColor } from "@needle-tools/engine";

export class Avatar extends Behaviour {
  userName!: String;
  color!: PlayerColor;

  setUserName(name: String) {
    this.userName = name;
  }
}
