import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import {
  EventStream,
  User,
  Stream,
  Subscriber,
  Subscription,
} from "../interfaces/StreamResponse.interface";

const baseUrl = "https://vu-backend.herokuapp.com";

/**
 * Fetching all streams available
 *
 * @param req request
 * @param res response
 * @param next
 * @returns links of all streams online
 */
const GetAllStreams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/api/streams`);
  let event: EventStream = result.data;
  let user: User = event.User;
  let streams: Stream[] = user.Streams;
  return res.status(200).json({
    streams: streams,
  });
};

const GetStreamFromUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result: AxiosResponse = await axios.get(`${baseUrl}/api/streams/search/`);
  let event: EventStream = result.data;
  let user: User = event.User;
  let streams: Stream[] = user.Streams;
  return res.status(200).json({
    streams: streams,
  });
};
