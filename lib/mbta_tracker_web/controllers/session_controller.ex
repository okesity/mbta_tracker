defmodule MbtaTrackerWeb.SessionController do
  use MbtaTrackerWeb, :controller
  alias MbtaTracker.Users
  alias MbtaTracker.Users.User

  action_fallback MbtaTrackerWeb.FallbackController
  def create(conn, %{"email" => email, "password" => password}) do
      with %User{} = user <- MbtaTracker.Users.get_and_auth_user(email, password) do
        resp = %{
          data: %{
            token: Phoenix.Token.sign(MbtaTrackerWeb.Endpoint, "user_id", user.id),
            user_id: user.id,
            user_name: user.name,
            user_email: user.email,
          }
        }
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(:created, Jason.encode!(resp))
      end
  end

  def create2(conn, %{"name" => name, "email" => email}) do
    result = MbtaTracker.Users.get_user_by_email(email)
    IO.inspect(result)
    with %User{} = user <- result do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(MbtaTrackerWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
          user_name: user.name,
          user_email: user.email,
        }
      }
    conn
    |> put_resp_header("content-type", "application/json; charset=utf-8")
    |> send_resp(:created, Jason.encode!(resp))
    end
  end


    def delete(conn, _params) do
      conn
      |> render("delete_token.json")
  end

end
