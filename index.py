import flask
import sqlite3
import json

app = flask.Flask(__name__)


@app.route("/")
def state_handler():
    conn = sqlite3.connect("warbanners.db")
    c = conn.cursor()
    board = c.execute("SELECT * FROM board").fetchall()
    houses = c.execute("SELECT * FROM houses").fetchall()
    alliances = c.execute("SELECT * FROM alliances").fetchall()

    state = {
        "timestamp": "2012-13-03",
        "board": [],
        "houses": [],
        "players": []
    }

    for tile in board:
        state["board"].append((tile[1], tile[2], tile[3]))

    for house in houses:
        state["houses"].append({
            "id": house[0],
            "name": house[1]
        })

    for player in c.execute("SELECT * FROM players").fetchall():
        player_state = {
            "id": player[0],
            "name": player[1],
            "house": player[2],
            "cities": []
        }
        for city in c.execute("SELECT * FROM cities WHERE player_id = ?", (player[0],)).fetchall():
            city_state = {
                "id": city[0],
                "x": city[1],
                "y": city[2],
                "armies": []
            }
            for army in c.execute("SELECT * FROM armies WHERE city_id = ?", (city[0],)).fetchall():
                army_state = {
                    "id": army[0],
                    "x": army[1],
                    "y": army[2]
                }
                city_state["armies"].append(army_state)
            player_state["cities"].append(city_state)
        state["players"].append(player_state)

    marshalled = json.dumps(state)

    response = flask.make_response(marshalled)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == "__main__":
    app.debug = True
    app.run()
