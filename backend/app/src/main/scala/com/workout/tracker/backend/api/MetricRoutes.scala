package com.workout.tracker.backend.api

import cats.effect.Concurrent
import com.workout.tracker.backend.metrics.InmemoryMetrics
import com.typesafe.scalalogging.Logger
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl
import io.circe.syntax._
import org.http4s.circe._

object MetricRoutes {

  def routes[F[_] : Concurrent]: HttpRoutes[F] = {
    val logger = Logger(getClass.getName)

    val dsl = Http4sDsl[F]
    import dsl._

    HttpRoutes.of[F] {
      case GET -> Root / "metrics" =>
        val metrics = InmemoryMetrics.report
        logger.info(s"GET -> /api/v1/metrics")

        Ok(metrics.asJson)
    }
  }
}
