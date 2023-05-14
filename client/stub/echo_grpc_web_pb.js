/**
 * @fileoverview gRPC-Web generated client stub for sandbox.echo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.sandbox = {};
proto.sandbox.echo = require('./echo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sandbox.echo.EchoClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.sandbox.echo.EchoPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sandbox.echo.EchoRequest,
 *   !proto.sandbox.echo.EchoResponse>}
 */
const methodDescriptor_Echo_UnaryEcho = new grpc.web.MethodDescriptor(
  '/sandbox.echo.Echo/UnaryEcho',
  grpc.web.MethodType.UNARY,
  proto.sandbox.echo.EchoRequest,
  proto.sandbox.echo.EchoResponse,
  /**
   * @param {!proto.sandbox.echo.EchoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sandbox.echo.EchoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sandbox.echo.EchoRequest,
 *   !proto.sandbox.echo.EchoResponse>}
 */
const methodInfo_Echo_UnaryEcho = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sandbox.echo.EchoResponse,
  /**
   * @param {!proto.sandbox.echo.EchoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sandbox.echo.EchoResponse.deserializeBinary
);


/**
 * @param {!proto.sandbox.echo.EchoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.sandbox.echo.EchoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.sandbox.echo.EchoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.sandbox.echo.EchoClient.prototype.unaryEcho =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/sandbox.echo.Echo/UnaryEcho',
      request,
      metadata || {},
      methodDescriptor_Echo_UnaryEcho,
      callback);
};


/**
 * @param {!proto.sandbox.echo.EchoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.sandbox.echo.EchoResponse>}
 *     Promise that resolves to the response
 */
proto.sandbox.echo.EchoPromiseClient.prototype.unaryEcho =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/sandbox.echo.Echo/UnaryEcho',
      request,
      metadata || {},
      methodDescriptor_Echo_UnaryEcho);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.sandbox.echo.EchoRequest,
 *   !proto.sandbox.echo.EchoResponse>}
 */
const methodDescriptor_Echo_ServerStreamingEcho = new grpc.web.MethodDescriptor(
  '/sandbox.echo.Echo/ServerStreamingEcho',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.sandbox.echo.EchoRequest,
  proto.sandbox.echo.EchoResponse,
  /**
   * @param {!proto.sandbox.echo.EchoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sandbox.echo.EchoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.sandbox.echo.EchoRequest,
 *   !proto.sandbox.echo.EchoResponse>}
 */
const methodInfo_Echo_ServerStreamingEcho = new grpc.web.AbstractClientBase.MethodInfo(
  proto.sandbox.echo.EchoResponse,
  /**
   * @param {!proto.sandbox.echo.EchoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.sandbox.echo.EchoResponse.deserializeBinary
);


/**
 * @param {!proto.sandbox.echo.EchoRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sandbox.echo.EchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.sandbox.echo.EchoClient.prototype.serverStreamingEcho =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sandbox.echo.Echo/ServerStreamingEcho',
      request,
      metadata || {},
      methodDescriptor_Echo_ServerStreamingEcho);
};


/**
 * @param {!proto.sandbox.echo.EchoRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.sandbox.echo.EchoResponse>}
 *     The XHR Node Readable Stream
 */
proto.sandbox.echo.EchoPromiseClient.prototype.serverStreamingEcho =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/sandbox.echo.Echo/ServerStreamingEcho',
      request,
      metadata || {},
      methodDescriptor_Echo_ServerStreamingEcho);
};


module.exports = proto.sandbox.echo;

