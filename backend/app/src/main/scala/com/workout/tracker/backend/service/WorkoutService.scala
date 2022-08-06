package com.workout.tracker.backend.service

import com.workout.tracker.backend.domain.Workout
import com.workout.tracker.backend.repository.WorkoutRepository

import scala.concurrent.Future

class WorkoutService(implicit val repository: WorkoutRepository) {
  def getAll: Future[Seq[Workout]] = {
    repository.getAll
  }

  def getById(workoutId: Int): Future[Option[Workout]] =
    repository.getById(workoutId)

  def add(workout: Workout): Unit = {
    repository.add(workout)
  }

  def delete(id: Int): Unit =
    repository.delete(id)
}
