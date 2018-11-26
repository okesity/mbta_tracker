defmodule MbtaTracker.Repo.Migrations.UpdateFavstopConstrain do
  use Ecto.Migration

  def change do
    create index(:favoritestops, [:user_id, :name], unique: true)
  end
end
