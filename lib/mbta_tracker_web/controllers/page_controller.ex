defmodule MbtaTrackerWeb.PageController do
  use MbtaTrackerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
