// package: webinar
// file: webinar.proto

import * as webinar_pb from "./webinar_pb";
import {grpc} from "@improbable-eng/grpc-web";

type WebinarServiceRequestWebinar = {
  readonly methodName: string;
  readonly service: typeof WebinarService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof webinar_pb.WebinarRequest;
  readonly responseType: typeof webinar_pb.WebinarResponse;
};

export class WebinarService {
  static readonly serviceName: string;
  static readonly RequestWebinar: WebinarServiceRequestWebinar;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class WebinarServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  requestWebinar(
    requestMessage: webinar_pb.WebinarRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: webinar_pb.WebinarResponse|null) => void
  ): UnaryResponse;
  requestWebinar(
    requestMessage: webinar_pb.WebinarRequest,
    callback: (error: ServiceError|null, responseMessage: webinar_pb.WebinarResponse|null) => void
  ): UnaryResponse;
}

