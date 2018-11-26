# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     MbtaTracker.Repo.insert!(%MbtaTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias MbtaTracker.Repo
alias MbtaTracker.Users.User

pwhash = Argon2.hash_pwd_salt("pass1")
Repo.insert!(%User{email: "alice@example.com", name: "alice", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", name: "bob", password_hash: pwhash})

alias MbtaTracker.Favoritestops.Favoritestop
Repo.insert!(%Favoritestop{name: "test1 stop name user 1", user_id: 1})
Repo.insert!(%Favoritestop{name: "test stop name user 1.2", user_id: 1})
Repo.insert!(%Favoritestop{name: "test stop name user 2", user_id: 2})
Repo.insert!(%Favoritestop{name: "test stop name user 2.2", user_id: 2})

