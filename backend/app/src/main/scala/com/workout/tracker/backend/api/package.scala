package com.workout.tracker.backend

import java.sql.Timestamp

import cats.effect.IO
import com.workout.tracker.backend.domain.{TrainingMode, Workout}
import io.circe.{Decoder, Encoder}
import org.http4s.circe._
import io.circe.generic.auto._
import org.http4s.EntityDecoder

import scala.concurrent.duration.{DurationInt, FiniteDuration}
import scala.util.Try

package object api {

  implicit val encodeDate: Encoder[Timestamp] =
    Encoder.encodeString.contramap[Timestamp](_.toString)

  implicit val decodeDate: Decoder[Timestamp] =
    Decoder.decodeString.emapTry { str =>
      Try(Timestamp.valueOf(str))
    }

  implicit val encodeTrainingMode: Encoder[TrainingMode] =
    Encoder.encodeString.contramap[TrainingMode](_.toString)

  implicit val decodeTrainingMode: Decoder[TrainingMode] =
    Decoder.decodeString.emapTry { str =>
      Try(TrainingMode(str))
    }

  implicit val decoder: EntityDecoder[IO, Workout] = jsonOf[IO, Workout]

  val maxWaitTime: FiniteDuration = 10.seconds
}
