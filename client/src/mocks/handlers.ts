import { rest, delay, HttpResponse } from "msw";
import { Message } from "google-protobuf";
import { EchoRequest, EchoResponse } from "stub/echo_pb";

function toBase64(uint8Array: Uint8Array): string {
  const decoder = new TextDecoder();
  return window.btoa(decoder.decode(uint8Array));
}

function fromBase64(base64Str: string): Uint8Array {
  const raw = window.atob(base64Str);
  const encoder = new TextEncoder();
  return encoder.encode(raw);
}

// from https://zenn.dev/link/comments/e8d9f805cb7a1f
function encodeRes(res: Message): Uint8Array {
  const bytes = res.serializeBinary();
  const frame = new ArrayBuffer(bytes.byteLength + 5);
  new DataView(frame, 1, 4).setUint32(0, bytes.length, false /* big endian */);
  new Uint8Array(frame, 5).set(bytes);
  return new Uint8Array(frame);
}

// from https://lucas-levin.com/code/blog/mocking-grpc-web-requests-for-integration-testing
function decodeReq(req: ArrayBuffer) {
  return new Uint8Array(req.slice(5));
}

export const handlers = [
  rest.post(
    "http://localhost:50051/sandbox.echo.Echo/UnaryEcho",
    async ({ request }) => {
      const req = EchoRequest.deserializeBinary(
        decodeReq(fromBase64(await request.text()))
      );

      const res = new EchoResponse().setMessage(`mocked: ${req.getMessage()}`);
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(toBase64(encodeRes(res))));
          controller.close();
        },
      });

      return new HttpResponse(stream, {
        headers: {
          "Content-Type": "application/grpc-web-text+proto",
        },
      });
    }
  ),
  rest.post(
    "http://localhost:50051/sandbox.echo.Echo/ServerStreamingEcho",
    async ({ request }) => {
      const req = EchoRequest.deserializeBinary(
        decodeReq(fromBase64(await request.text()))
      );

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          for (let i = 0; i < 5; i++) {
            controller.enqueue(
              encoder.encode(
                toBase64(
                  encodeRes(
                    new EchoResponse().setMessage(
                      `mocked (${i}): ${req.getMessage()}`
                    )
                  )
                )
              )
            );
            await delay(1000);
          }
        },
      });

      return new HttpResponse(stream, {
        headers: {
          "Content-Type": "application/grpc-web-text+proto",
        },
      });
    }
  ),
];
