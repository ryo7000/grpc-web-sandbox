import { useState } from "react";
import { ClientReadableStream } from "grpc-web";
import { EchoPromiseClient } from "stub/echo_grpc_web_pb";
import { EchoRequest, EchoResponse } from "stub/echo_pb";
import "./App.css";

const GRPC_ADDR = `http://${window.location.hostname}:50051`;

function App() {
  const [unaryRes, setUnaryRes] = useState("");
  const [streamRes, setStreamRes] = useState<string[]>([]);
  const [stream, setStream] = useState<ClientReadableStream<EchoResponse>>();

  const client = new EchoPromiseClient(GRPC_ADDR);

  const unaryEcho = async () => {
    setUnaryRes("");
    const res = await client.unaryEcho(new EchoRequest().setMessage("unary"));
    setUnaryRes(res.getMessage());
  };

  const streamEcho = async () => {
    setStreamRes([]);
    stream?.cancel();

    const s = client.serverStreamingEcho(new EchoRequest().setMessage("unary"));

    s.on("data", (res) => {
      setStreamRes((prev) => [...prev, res.getMessage()]);
    });

    s.on("error", () => {
      setStream(undefined);
    });

    s.on("end", () => {
      setStream(undefined);
    });

    setStream(s);
  };

  const cancel = () => stream?.cancel();

  return (
    <>
      <div className="card">
        <div>
          <button onClick={unaryEcho}>unaryEcho</button>
          <span>{unaryRes}</span>
        </div>
        <div>
          <button onClick={streamEcho}>streamEcho</button>
          <button onClick={cancel}>cancel</button>
          <textarea readOnly value={streamRes.join("\n")} />
        </div>
      </div>
    </>
  );
}

export default App;
