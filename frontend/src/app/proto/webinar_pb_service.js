// package: webinar
// file: webinar.proto

var webinar_pb = require("./webinar_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var WebinarService = (function () {
  function WebinarService() {}
  WebinarService.serviceName = "webinar.WebinarService";
  return WebinarService;
}());

WebinarService.RequestWebinar = {
  methodName: "RequestWebinar",
  service: WebinarService,
  requestStream: false,
  responseStream: false,
  requestType: webinar_pb.WebinarRequest,
  responseType: webinar_pb.WebinarResponse
};

exports.WebinarService = WebinarService;

function WebinarServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WebinarServiceClient.prototype.requestWebinar = function requestWebinar(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WebinarService.RequestWebinar, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.WebinarServiceClient = WebinarServiceClient;

