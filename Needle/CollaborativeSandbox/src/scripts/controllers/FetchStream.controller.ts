import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import {
  EventStream,
  User,
  Stream,
  Subscriber,
  Subscription,
} from "../interfaces/StreamResponse.interface";
import { StreamPlayer } from "../StreamPlayer";
import { Avatar } from "../Avatar";

const baseUrl = "https://vu-backend.herokuapp.com";

const enterLobbyRoom = async (req: Request, res: Response) => {
  let userName = req.body.firstName + " " + req.body.lastName;
  let muxId = req.body.mux_playback_id;

  let stream!: StreamPlayer;
  stream.getInfoFromRequest(muxId);

  let avatar!: Avatar;
  avatar.setUserName(userName);

  return res.status(201).json({
    muxId: muxId,
  });
};

/**
 * Fetching all streams available
 *
 * @param req request
 * @param res response
 * @returns links of all streams online
 */
const GetAllStreams = async (req: Request, res: Response) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/api/streams`);
  let event: EventStream = result.data;
  let user: User = event.User;
  let streams: Stream[] = user.Streams;
  return res.status(200).json({
    streams: streams,
  });
};

const GetStreamFromUser = async (req: Request, res: Response) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/api/streams/search/`);
  let event: EventStream = result.data;
  let user: User = event.User;
  let streams: Stream[] = user.Streams;
  return res.status(200).json({
    streams: streams,
  });
};
