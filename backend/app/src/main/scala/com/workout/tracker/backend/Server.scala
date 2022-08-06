package com.workout.tracker.backend

import cats.data.Kleisli
import cats.effect._
import cats.syntax.semigroupk._
import com.comcast.ip4s.IpLiteralSyntax
import com.typesafe.scalalogging.Logger
import com.workout.tracker.backend.api.{MetricRoutes, WorkoutRoutes}
import org.http4s.ember.server.EmberServerBuilder
import org.http4s.implicits.http4sKleisliResponseSyntaxOptionT
import org.http4s.server.Router
import org.http4s.server.middleware._
import org.http4s.{HttpRoutes, Request, Response}
import org.slf4j.LoggerFactory

object Server extends IOApp {
  def allRoutes: HttpRoutes[IO] = {
    WorkoutRoutes.routes <+> MetricRoutes.routes[IO]
  }

  val apis: Kleisli[IO, Request[IO], Response[IO]] = Router(
    "/api/v1" -> CORS.httpRoutes(allRoutes),
  ).orNotFound
  
  val logger: Logger = Logger(LoggerFactory.getLogger("workout-tracker"))

  override def run(args: List[String]): IO[ExitCode] = {
    EmberServerBuilder
      .default[IO]
      .withHost(ipv4"0.0.0.0")
      .withPort(port"8080")
      .withHttpApp(apis)
      .build
      .use(_ => IO.never)
      .as(ExitCode.Success)
  }
}
