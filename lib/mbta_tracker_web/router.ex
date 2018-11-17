defmodule MbtaTrackerWeb.Router do
  use MbtaTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MbtaTrackerWeb do
    pipe_through :browser

    get "/", PageController, :index
    resources "/users", UserController
  end

  scope "api/v1", MbtaTrackerWeb do
    pipe_through :api
    resources "sessions", SessionController, only: [:create]
  end
  # Other scopes may use custom stacks.
  # scope "/api", MbtaTrackerWeb do
  #   pipe_through :api
  # end
end
