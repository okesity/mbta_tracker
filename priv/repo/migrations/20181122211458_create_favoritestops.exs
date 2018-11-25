defmodule MbtaTracker.Repo.Migrations.CreateFavoritestops do
  use Ecto.Migration

  def change do
    create table(:favoritestops) do
      add :name, :string, null: false
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:favoritestops, [:user_id])
  end
end
