// package: comments
// file: comments.proto

import * as jspb from "google-protobuf";

export class CommentWritten extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentWritten.AsObject;
  static toObject(includeInstance: boolean, msg: CommentWritten): CommentWritten.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommentWritten, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentWritten;
  static deserializeBinaryFromReader(message: CommentWritten, reader: jspb.BinaryReader): CommentWritten;
}

export namespace CommentWritten {
  export type AsObject = {
    username: string,
    content: string,
    timestamp: string,
  }
}

export class CommentsUpdated extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentsUpdated.AsObject;
  static toObject(includeInstance: boolean, msg: CommentsUpdated): CommentsUpdated.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommentsUpdated, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentsUpdated;
  static deserializeBinaryFromReader(message: CommentsUpdated, reader: jspb.BinaryReader): CommentsUpdated;
}

export namespace CommentsUpdated {
  export type AsObject = {
    username: string,
    content: string,
    timestamp: string,
  }
}

