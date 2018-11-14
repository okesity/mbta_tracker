# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :mbta_tracker,
  ecto_repos: [MbtaTracker.Repo]

# Configures the endpoint
config :mbta_tracker, MbtaTrackerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "tFQ+LxN4d68rcboxI3Z3bAaxQGhNPwTjkEuRrPffN9jrU2/JdxsZXI2m3mO8k/Bb",
  render_errors: [view: MbtaTrackerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MbtaTracker.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
