defmodule MbtaTrackerWeb.FavoritestopView do
  use MbtaTrackerWeb, :view
  alias MbtaTrackerWeb.FavoritestopView

  def render("index.json", %{favoritestops: favoritestops}) do
    %{data: render_many(favoritestops, FavoritestopView, "favoritestop.json")}
  end

  def render("show.json", %{favoritestop: favoritestop}) do
    %{data: render_one(favoritestop, FavoritestopView, "favoritestop.json")}
  end

  def render("favoritestop.json", %{favoritestop: favoritestop}) do
    %{id: favoritestop.id,
      name: favoritestop.name,
      user_id: favoritestop.user_id}
  end
end
