import flask
import sqlite3
import json

app = flask.Flask(__name__)


@app.route("/")
def state_handler():
    conn = sqlite3.connect("warbanners.db")
    c = conn.cursor()

    board = c.execute("SELECT x, y, t FROM board").fetchall()
    houses = c.execute("SELECT id, name FROM houses").fetchall()
    players = c.execute("SELECT id, name, house FROM players").fetchall()

    city_by_player = "SELECT id, x, y FROM cities WHERE player_id = ?"
    army_by_city = "SELECT id, x, y FROM armies WHERE city_id = ?"

    state = {
        "timestamp": "2012-13-03", "board": [], "houses": [], "players": []
    }

    for x, y, t in board:
        state["board"].append((x, y, t))

    for house_id, name in houses:
        state["houses"].append({"id": house_id, "name": name})

    for player_id, name, house in players:
        player = {"id": player_id, "name": name, "house": house, "cities": []}

        for city_id, x, y in c.execute(city_by_player, (player_id,)).fetchall():
            city = {"id": city_id, "x": x, "y": y, "armies": []}

            for army_id, x, y in c.execute(army_by_city, (city_id,)).fetchall():
                city["armies"].append({"id": army_id, "x": x, "y": y})

            player["cities"].append(city)
            
        state["players"].append(player)

    response = flask.make_response(json.dumps(state))
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == "__main__":
    app.debug = True
    app.run()
