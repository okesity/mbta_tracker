defmodule MbtaTracker.FavoritestopsTest do
  use MbtaTracker.DataCase

  alias MbtaTracker.Favoritestops

  describe "favoritestops" do
    alias MbtaTracker.Favoritestops.Favoritestop

    @valid_attrs %{stop_name: "some stop_name"}
    @update_attrs %{stop_name: "some updated stop_name"}
    @invalid_attrs %{stop_name: nil}

    def favoritestop_fixture(attrs \\ %{}) do
      {:ok, favoritestop} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Favoritestops.create_favoritestop()

      favoritestop
    end

    test "list_favoritestops/0 returns all favoritestops" do
      favoritestop = favoritestop_fixture()
      assert Favoritestops.list_favoritestops() == [favoritestop]
    end

    test "get_favoritestop!/1 returns the favoritestop with given id" do
      favoritestop = favoritestop_fixture()
      assert Favoritestops.get_favoritestop!(favoritestop.id) == favoritestop
    end

    test "create_favoritestop/1 with valid data creates a favoritestop" do
      assert {:ok, %Favoritestop{} = favoritestop} = Favoritestops.create_favoritestop(@valid_attrs)
      assert favoritestop.stop_name == "some stop_name"
    end

    test "create_favoritestop/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Favoritestops.create_favoritestop(@invalid_attrs)
    end

    test "update_favoritestop/2 with valid data updates the favoritestop" do
      favoritestop = favoritestop_fixture()
      assert {:ok, %Favoritestop{} = favoritestop} = Favoritestops.update_favoritestop(favoritestop, @update_attrs)
      assert favoritestop.stop_name == "some updated stop_name"
    end

    test "update_favoritestop/2 with invalid data returns error changeset" do
      favoritestop = favoritestop_fixture()
      assert {:error, %Ecto.Changeset{}} = Favoritestops.update_favoritestop(favoritestop, @invalid_attrs)
      assert favoritestop == Favoritestops.get_favoritestop!(favoritestop.id)
    end

    test "delete_favoritestop/1 deletes the favoritestop" do
      favoritestop = favoritestop_fixture()
      assert {:ok, %Favoritestop{}} = Favoritestops.delete_favoritestop(favoritestop)
      assert_raise Ecto.NoResultsError, fn -> Favoritestops.get_favoritestop!(favoritestop.id) end
    end

    test "change_favoritestop/1 returns a favoritestop changeset" do
      favoritestop = favoritestop_fixture()
      assert %Ecto.Changeset{} = Favoritestops.change_favoritestop(favoritestop)
    end
  end
end
