import * as grpcWeb from 'grpc-web';

import * as echo_pb from './echo_pb';


export class EchoClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  unaryEcho(
    request: echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: echo_pb.EchoResponse) => void
  ): grpcWeb.ClientReadableStream<echo_pb.EchoResponse>;

  serverStreamingEcho(
    request: echo_pb.EchoRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<echo_pb.EchoResponse>;

}

export class EchoPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  unaryEcho(
    request: echo_pb.EchoRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<echo_pb.EchoResponse>;

  serverStreamingEcho(
    request: echo_pb.EchoRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<echo_pb.EchoResponse>;

}

