import flask
import sqlite3
import json

app = flask.Flask(__name__)


@app.route("/")
def state_handler():
    conn = sqlite3.connect("example.db")
    c = conn.cursor()
    board = c.execute("SELECT * FROM board").fetchall()
    players = c.execute("SELECT * FROM players").fetchall()
    houses = c.execute("SELECT * FROM houses").fetchall()
    cities = c.execute("SELECT * FROM cities").fetchall()
    armies = c.execute("SELECT * FROM armies").fetchall()
    alliances = c.execute("SELECT * FROM alliances").fetchall()

    serialized = json.dumps({
        "alliances": alliances,
        "armies": armies,
        "board": board,
        "cities": cities,
        "houses": houses,
        "players": players,
    })

    response = flask.make_response(serialized)
    response.headers["Content-Type"] = "application/json"
    return response

if __name__ == "__main__":
    app.debug = True
    app.run()
