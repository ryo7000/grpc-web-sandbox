// Based on https://github.com/hyperium/tonic/blob/master/examples/src/streaming/server.rs
pub mod pb {
    tonic::include_proto!("sandbox.echo");
}

use futures::Stream;
use std::{pin::Pin, time::Duration};
use tokio::sync::mpsc;
use tokio_stream::{wrappers::ReceiverStream, StreamExt};
use tonic::{transport::Server, Request, Response, Status};

type EchoResult<T> = Result<Response<T>, Status>;
type ResponseStream = Pin<Box<dyn Stream<Item = Result<pb::EchoResponse, Status>> + Send>>;

#[derive(Debug)]
pub struct EchoServer {}

#[tonic::async_trait]
impl pb::echo_server::Echo for EchoServer {
    async fn unary_echo(&self, req: Request<pb::EchoRequest>) -> EchoResult<pb::EchoResponse> {
        Ok(Response::new(pb::EchoResponse {
            message: req.into_inner().message,
        }))
    }

    type ServerStreamingEchoStream = ResponseStream;

    async fn server_streaming_echo(
        &self,
        req: Request<pb::EchoRequest>,
    ) -> EchoResult<Self::ServerStreamingEchoStream> {
        println!("EchoServer::server_streaming_echo");
        println!("\tclient connected from: {:?}", req.remote_addr());

        // creating infinite stream with requested message
        let repeat = std::iter::repeat(pb::EchoResponse {
            message: req.into_inner().message,
        });
        let mut stream = Box::pin(tokio_stream::iter(repeat).throttle(Duration::from_millis(1000)));

        // spawn and channel are required if you want handle "disconnect" functionality
        // the `out_stream` will not be polled after client disconnect
        let (tx, rx) = mpsc::channel(128);
        tokio::spawn(async move {
            while let Some(item) = stream.next().await {
                match tx.send(Result::<_, Status>::Ok(item)).await {
                    Ok(_) => {
                        // item (server response) was queued to be send to client
                    }
                    Err(_item) => {
                        // output_stream was build from rx and both are dropped
                        break;
                    }
                }
            }
            println!("\tclient disconnected");
        });

        let output_stream = ReceiverStream::new(rx);
        Ok(Response::new(
            Box::pin(output_stream) as Self::ServerStreamingEchoStream
        ))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse()?;

    let server = EchoServer {};
    Server::builder()
        .accept_http1(true)
        .add_service(tonic_web::enable(pb::echo_server::EchoServer::new(server)))
        .serve(addr)
        .await?;

    Ok(())
}
