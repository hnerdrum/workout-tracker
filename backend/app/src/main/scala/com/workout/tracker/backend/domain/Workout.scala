package com.workout.tracker.backend.domain

import java.sql.Timestamp

import io.circe.{Decoder, Encoder}

import scala.util.Try

case class Workout(
                           workoutId: Option[Int],
                           date: Timestamp,
                           rating: Int,
                           duration: Double,
                           distance: Double,
                           averageSpeed: Double,
                           heartRate: Int,
                           mode: TrainingMode,
                           description: String
)


sealed trait TrainingMode {
  override def toString: String = TrainingMode.unapply(this)
}

case object Slow extends TrainingMode
case object Long extends TrainingMode
case object Threshold extends TrainingMode
case object Tempo extends TrainingMode

object TrainingMode {

  def apply(mode: String): TrainingMode = mode match {
    case "Slow" => Slow
    case "Long" => Long
    case "Threshold" => Threshold
    case "Tempo" => Tempo
  }

  def unapply(mode: TrainingMode): String = mode match {
    case Slow => "Slow"
    case Long => "Long"
    case Threshold => "Threshold"
    case Tempo => "Tempo"
  }

}