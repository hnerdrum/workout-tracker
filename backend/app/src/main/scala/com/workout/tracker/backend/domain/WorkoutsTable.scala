package com.workout.tracker.backend.domain

import java.sql.Timestamp

import slick.ast.BaseTypedType
import slick.jdbc.JdbcType
import slick.jdbc.PostgresProfile.api._

class WorkoutsTable(tag: Tag) extends Table[Workout](tag, None, "workouts") {

  implicit val trainingModeType: JdbcType[TrainingMode] with BaseTypedType[TrainingMode] =
    MappedColumnType.base[TrainingMode, String](TrainingMode.unapply, TrainingMode.apply)

  def workoutId            = column[Option[Int]]("workout_id", O.AutoInc, O.PrimaryKey)
  def date                 = column[Timestamp]("date")
  def rating               = column[Int]("rating")
  def duration             = column[Double]("duration")
  def distance             = column[Double]("distance")
  def averageSpeed         = column[Double]("average_speed")
  def heartRate            = column[Int]("heart_rate")
  def mode                 = column[TrainingMode]("mode")
  def description          = column[String]("description")

  def * = (
    workoutId,
    date,
    rating,
    duration,
    distance,
    averageSpeed,
    heartRate,
    mode,
    description,
  ) <> (Workout.tupled, Workout.unapply)
}