defmodule MbtaTracker.Favoritestops.Favoritestop do
  use Ecto.Schema
  import Ecto.Changeset


  schema "favoritestops" do
    field :stop_name, :string
    # field :user_id, :id
    belongs_to :user, MbtaTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(favoritestop, attrs) do
    favoritestop
    |> cast(attrs, [:stop_name, :user_id])
    |> validate_required([:stop_name, :user_id])
  end
end
