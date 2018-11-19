defmodule MbtaTracker.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :pw_tries, :integer, null: false, default: 0
      add :pw_last_try, :utc_datetime

      timestamps()
    end

    create index(:users, [:email], unique: true)
  end
end
