defmodule MbtaTrackerWeb.FavoritestopController do
  use MbtaTrackerWeb, :controller

  alias MbtaTracker.Favoritestops
  alias MbtaTracker.Favoritestops.Favoritestop

  action_fallback MbtaTrackerWeb.FallbackController

  def index(conn, _params) do
    favoritestops = Favoritestops.list_favoritestops()
    render(conn, "index.json", favoritestops: favoritestops)
  end

  def create(conn, %{"favoritestop" => favoritestop_params}) do
    with {:ok, %Favoritestop{} = favoritestop} <- Favoritestops.create_favoritestop(favoritestop_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.favoritestop_path(conn, :show, favoritestop))
      |> render("show.json", favoritestop: favoritestop)
    end
  end

  def show(conn, %{"id" => id}) do
    favoritestop = Favoritestops.get_favoritestop!(id)
    render(conn, "show.json", favoritestop: favoritestop)
  end

  def update(conn, %{"id" => id, "favoritestop" => favoritestop_params}) do
    favoritestop = Favoritestops.get_favoritestop!(id)

    with {:ok, %Favoritestop{} = favoritestop} <- Favoritestops.update_favoritestop(favoritestop, favoritestop_params) do
      render(conn, "show.json", favoritestop: favoritestop)
    end
  end

  def delete(conn, %{"id" => id}) do
    favoritestop = Favoritestops.get_favoritestop!(id)

    with {:ok, %Favoritestop{}} <- Favoritestops.delete_favoritestop(favoritestop) do
      send_resp(conn, :no_content, "")
    end
  end
end
