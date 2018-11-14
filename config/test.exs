use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mbta_tracker, MbtaTrackerWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :mbta_tracker, MbtaTracker.Repo,
  username: "mbta_tracker",
  password: "hie8pheeD2ue",
  database: "mbta_tracker_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
