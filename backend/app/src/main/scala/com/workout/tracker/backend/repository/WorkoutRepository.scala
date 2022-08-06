package com.workout.tracker.backend.repository

import scala.concurrent.ExecutionContext.Implicits.global

import com.workout.tracker.backend.config.ApplicationConfig
import com.workout.tracker.backend.domain.{Workout, WorkoutsTable}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

trait WorkoutRepository {
  def getAll: Future[Seq[Workout]]

  def getById(workoutId: Int): Future[Option[Workout]]

  def add(workout: Workout): Unit

  def delete(workoutId: Int): Unit
}

object WorkoutRepository {
  implicit val workoutRepository: WorkoutRepository = new WorkoutRepository {

    private val workoutTable = TableQuery[WorkoutsTable]

    override def getAll: Future[Seq[Workout]] = {
      ApplicationConfig.db.run(workoutTable.result)
    }

    override def getById(workoutId: Int): Future[Option[Workout]] = {
      val query = workoutTable.filter(_.workoutId === workoutId)
      ApplicationConfig.db.run(query.result).map(_.headOption)
    }

    override def add(workout: Workout): Unit = {
      val addWorkoutQuery = workoutTable += workout
      Await.result(ApplicationConfig.db.run(addWorkoutQuery), Duration.Inf)
    }

    override def delete(workoutId: Int): Unit = {
      val workoutToDelete = workoutTable.filter(_.workoutId === workoutId)
      val deleteWorkoutQuery = workoutToDelete.delete
      ApplicationConfig.db.run(deleteWorkoutQuery)
    }
  }
}
