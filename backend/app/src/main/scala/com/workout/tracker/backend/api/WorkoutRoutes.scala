package com.workout.tracker.backend.api

import cats.effect._
import cats.implicits._
import com.workout.tracker.backend.domain.Workout
import com.workout.tracker.backend.metrics.{InmemoryMetrics, MetricNames}
import com.typesafe.scalalogging.Logger
import org.http4s.circe._
import org.http4s._
import io.circe.generic.auto._
import io.circe.syntax._
import io.circe.DecodingFailure
import com.workout.tracker.backend.service.WorkoutService
import com.workout.tracker.backend.repository.WorkoutRepository.workoutRepository
import org.http4s.circe.CirceEntityCodec.circeEntityEncoder
import org.http4s.dsl._
import scala.concurrent.Await

object WorkoutRoutes {
  def routes: HttpRoutes[IO] = {
    val logger = Logger(getClass.getName)

    val service = new WorkoutService

    val dsl: Http4sDsl[IO] = Http4sDsl[IO]
    import dsl._

    HttpRoutes.of[IO] {
      case GET -> Root / "workouts" =>
        logger.info("GET -> /api/v1/workouts")
        InmemoryMetrics.increment(MetricNames.GET_WORKOUTS)
        val workouts = Await.result(service.getAll, maxWaitTime)
        Ok(workouts)

      case GET -> Root / "workouts" / IntVar(workoutId) =>
        logger.info(s"GET -> /api/v1/workouts/$workoutId")
        InmemoryMetrics.increment(MetricNames.GET_WORKOUT_BY_ID)

        Await.result(service.getById(workoutId), maxWaitTime) match {
          case Some(workout) => Ok(workout.asJson)
          case None          =>
            InmemoryMetrics.increment(MetricNames.GET_WORKOUT_NOT_FOUND)
            NotFound(s"Workout with ID $workoutId not found.")
        }

      case req @ POST -> Root / "workouts" =>
        logger.info("POST -> /api/v1/workouts")
        InmemoryMetrics.increment(MetricNames.POST_WORKOUT)

        req.as[Workout].attempt.flatMap {
          case Left(failure) =>
            logger.error(s"$failure")

            failure.getCause match {
              case d: DecodingFailure =>
                InmemoryMetrics.increment(MetricNames.POST_WORKOUT_DECODE_FAILED)
                BadRequest(d.show)
              case _ =>
                InmemoryMetrics.increment(MetricNames.POST_WORKOUT_BAD_REQUEST)
                BadRequest(failure.toString)
            }
          case Right(workout) =>
            service.add(workout)
            Created()
        }.handleErrorWith {
          case e: Exception =>
            logger.error(s"$e")
            InmemoryMetrics.increment(MetricNames.POST_WORKOUT_FAILED)
            InternalServerError(e.toString)
        }

      case DELETE -> Root / "workouts" / IntVar(workoutId) =>
        logger.info(s"DELETE -> /api/v1/workouts/$workoutId")
        InmemoryMetrics.increment(MetricNames.DELETE_WORKOUT)

        service.delete(workoutId)
        NoContent()
    }
  }
}
