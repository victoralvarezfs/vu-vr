import { Behaviour, serializeable, VideoPlayer } from "@needle-tools/engine";
import { Object3D } from "three";
import Hls from "hls.js";

const videoSrc =
  "https://stream.mux.com/Fyvwzkck4pfe149v4geCckdbR5rq9fJbWLhPVGSKh44.m3u8";

export class StreamPlayer extends Behaviour {
  @serializeable(null)
  videos?: Array<string>;
  @serializeable(Object3D)
  vidPlayer: VideoPlayer = new VideoPlayer();

  hls = new Hls();

  start() {
    console.log("Stream Player script running...");
    this.PlayStream(videoSrc);
  }

  private PlayStream(url: string) {
    console.log("***Play stream: " + url);
    this.vidPlayer.stop();
    this.vidPlayer.setClipURL(url);
    if (this.vidPlayer.videoElement != null) {
      this.hls.attachMedia(this.vidPlayer.videoElement);
    }
    this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      this.hls.loadSource(url);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.vidPlayer.play();
      });
    });

    this.vidPlayer.play();
  }
}
