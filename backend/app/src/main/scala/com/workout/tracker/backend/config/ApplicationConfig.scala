package com.workout.tracker.backend.config

import pureconfig.generic.auto._
import pureconfig.ConfigSource
import slick.jdbc.PostgresProfile.api._

final case class Config(database: DatabaseConfig)

final case class DatabaseConfig(url: String)

object ApplicationConfig {
  private val source = ConfigSource.resources("conf/application.conf")
  private val loadedConfig = source.loadOrThrow[Config]

  val db = Database.forURL(loadedConfig.database.url, driver = "org.postgresql.Driver")
}
