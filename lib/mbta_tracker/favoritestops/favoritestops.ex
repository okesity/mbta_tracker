defmodule MbtaTracker.Favoritestops do
  @moduledoc """
  The Favoritestops context.
  """

  import Ecto.Query, warn: false
  alias MbtaTracker.Repo

  alias MbtaTracker.Favoritestops.Favoritestop

  @doc """
  Returns the list of favoritestops.

  ## Examples

      iex> list_favoritestops()
      [%Favoritestop{}, ...]

  """
  def list_favoritestops do
    Repo.all(Favoritestop)
  end

  @doc """
  Gets a single favoritestop.

  Raises `Ecto.NoResultsError` if the Favoritestop does not exist.

  ## Examples

      iex> get_favoritestop!(123)
      %Favoritestop{}

      iex> get_favoritestop!(456)
      ** (Ecto.NoResultsError)

  """
  def get_favoritestop!(id), do: Repo.get!(Favoritestop, id)

  @doc """
  Creates a favoritestop.

  ## Examples

      iex> create_favoritestop(%{field: value})
      {:ok, %Favoritestop{}}

      iex> create_favoritestop(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_favoritestop(attrs \\ %{}) do
    %Favoritestop{}
    |> Favoritestop.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a favoritestop.

  ## Examples

      iex> update_favoritestop(favoritestop, %{field: new_value})
      {:ok, %Favoritestop{}}

      iex> update_favoritestop(favoritestop, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_favoritestop(%Favoritestop{} = favoritestop, attrs) do
    favoritestop
    |> Favoritestop.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Favoritestop.

  ## Examples

      iex> delete_favoritestop(favoritestop)
      {:ok, %Favoritestop{}}

      iex> delete_favoritestop(favoritestop)
      {:error, %Ecto.Changeset{}}

  """
  def delete_favoritestop(%Favoritestop{} = favoritestop) do
    Repo.delete(favoritestop)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking favoritestop changes.

  ## Examples

      iex> change_favoritestop(favoritestop)
      %Ecto.Changeset{source: %Favoritestop{}}

  """
  def change_favoritestop(%Favoritestop{} = favoritestop) do
    Favoritestop.changeset(favoritestop, %{})
  end
end
