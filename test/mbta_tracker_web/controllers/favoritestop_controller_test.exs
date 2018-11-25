defmodule MbtaTrackerWeb.FavoritestopControllerTest do
  use MbtaTrackerWeb.ConnCase

  alias MbtaTracker.Favoritestops
  alias MbtaTracker.Favoritestops.Favoritestop

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  def fixture(:favoritestop) do
    {:ok, favoritestop} = Favoritestops.create_favoritestop(@create_attrs)
    favoritestop
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all favoritestops", %{conn: conn} do
      conn = get(conn, Routes.favoritestop_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create favoritestop" do
    test "renders favoritestop when data is valid", %{conn: conn} do
      conn = post(conn, Routes.favoritestop_path(conn, :create), favoritestop: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.favoritestop_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.favoritestop_path(conn, :create), favoritestop: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update favoritestop" do
    setup [:create_favoritestop]

    test "renders favoritestop when data is valid", %{conn: conn, favoritestop: %Favoritestop{id: id} = favoritestop} do
      conn = put(conn, Routes.favoritestop_path(conn, :update, favoritestop), favoritestop: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.favoritestop_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, favoritestop: favoritestop} do
      conn = put(conn, Routes.favoritestop_path(conn, :update, favoritestop), favoritestop: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete favoritestop" do
    setup [:create_favoritestop]

    test "deletes chosen favoritestop", %{conn: conn, favoritestop: favoritestop} do
      conn = delete(conn, Routes.favoritestop_path(conn, :delete, favoritestop))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.favoritestop_path(conn, :show, favoritestop))
      end
    end
  end

  defp create_favoritestop(_) do
    favoritestop = fixture(:favoritestop)
    {:ok, favoritestop: favoritestop}
  end
end
