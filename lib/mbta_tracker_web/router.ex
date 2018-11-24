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
  end

  scope "/api/v1", MbtaTrackerWeb do
    pipe_through :api
    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/newuser", UserController, :create
    post "/oauthsessions", SessionController, :create1
    resources "/favoritestops", FavoritestopController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit]
  end
  # Other scopes may use custom stacks.
  # scope "/api", MbtaTrackerWeb do
  #   pipe_through :api
  # end
end
