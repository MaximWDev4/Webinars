// package: comments
// file: comments.proto

import * as comments_pb from "./comments_pb";
import {grpc} from "@improbable-eng/grpc-web";

type commentsRequestComments = {
  readonly methodName: string;
  readonly service: typeof comments;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof comments_pb.CommentWritten;
  readonly responseType: typeof comments_pb.CommentsUpdated;
};

export class comments {
  static readonly serviceName: string;
  static readonly RequestComments: commentsRequestComments;
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

export class commentsClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  requestComments(metadata?: grpc.Metadata): BidirectionalStream<comments_pb.CommentWritten, comments_pb.CommentsUpdated>;
}

