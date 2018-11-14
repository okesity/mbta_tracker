defmodule MbtaTracker.Repo do
  use Ecto.Repo,
    otp_app: :mbta_tracker,
    adapter: Ecto.Adapters.Postgres
end
