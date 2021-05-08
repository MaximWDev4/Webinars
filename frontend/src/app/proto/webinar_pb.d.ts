// package: webinar
// file: webinar.proto

import * as jspb from "google-protobuf";

export class WebinarRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WebinarRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WebinarRequest): WebinarRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WebinarRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WebinarRequest;
  static deserializeBinaryFromReader(message: WebinarRequest, reader: jspb.BinaryReader): WebinarRequest;
}

export namespace WebinarRequest {
  export type AsObject = {
    name: string,
  }
}

export class WebinarResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getName(): string;
  setName(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WebinarResponse.AsObject;
  static toObject(includeInstance: boolean, msg: WebinarResponse): WebinarResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WebinarResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WebinarResponse;
  static deserializeBinaryFromReader(message: WebinarResponse, reader: jspb.BinaryReader): WebinarResponse;
}

export namespace WebinarResponse {
  export type AsObject = {
    message: string,
    name: string,
    url: string,
  }
}

