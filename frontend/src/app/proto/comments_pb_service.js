// package: comments
// file: comments.proto

var comments_pb = require("./comments_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var comments = (function () {
  function comments() {}
  comments.serviceName = "comments.comments";
  return comments;
}());

comments.RequestComments = {
  methodName: "RequestComments",
  service: comments,
  requestStream: true,
  responseStream: true,
  requestType: comments_pb.CommentWritten,
  responseType: comments_pb.CommentsUpdated
};

exports.comments = comments;

function commentsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

commentsClient.prototype.requestComments = function requestComments(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(comments.RequestComments, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.commentsClient = commentsClient;

