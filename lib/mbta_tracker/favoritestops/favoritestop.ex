defmodule MbtaTracker.Favoritestops.Favoritestop do
  use Ecto.Schema
  import Ecto.Changeset


  schema "favoritestops" do
    field :name, :string
    # field :user_id, :id
    belongs_to :user, MbtaTracker.Users.User

    timestamps()
  end

  @doc false
  def changeset(favoritestop, attrs) do
    favoritestop
    |> cast(attrs, [:name, :user_id])
    |> validate_required([:name])
  end
end
