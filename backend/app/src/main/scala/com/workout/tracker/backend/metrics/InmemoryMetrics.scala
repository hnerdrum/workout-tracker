package com.workout.tracker.backend.metrics

object InmemoryMetrics {
  private var repository = scala.collection.mutable.Map[String, Int]()

  def increment(metricName: String): Unit = {
    val newValue = repository.getOrElse(metricName, 0) + 1
    repository += (metricName -> newValue)
  }

  def report: scala.collection.mutable.Map[String, Int] = repository
}

object MetricNames {
  val GET_WORKOUTS = "get.workouts"
  val GET_WORKOUT_BY_ID = "get.workout_by_id"
  val GET_WORKOUT_NOT_FOUND = "get.workout_not_found"
  val POST_WORKOUT = "post.workout"
  val POST_WORKOUT_DECODE_FAILED = "post.workout_decode_failed"
  val POST_WORKOUT_FAILED = "post.workout_failed"
  val POST_WORKOUT_BAD_REQUEST = "post.workout_bad_request"
  val DELETE_WORKOUT = "delete.workout"
}
