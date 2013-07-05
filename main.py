from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, abort, session, make_response, url_for,\
    render_template, jsonify
import requests
import json

app = Flask(__name__)
app.secret_key = "nothing unique about this"


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

        for city_id, x, y in c.execute(city_by_player,
                                       (player_id,)).fetchall():
            city = {"id": city_id, "x": x, "y": y, "armies": []}

            for army_id, x, y in c.execute(army_by_city,
                                           (city_id,)).fetchall():
                city["armies"].append({"id": army_id, "x": x, "y": y})

            player["cities"].append(city)

        state["players"].append(player)

    response = make_response(json.dumps(state))
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@app.route('/login', methods=['GET'])
def mozilla_buttons():
    return render_template('login.html', error='')


@app.route('/auth/login', methods=['GET', 'POST'])
def login():
    error = None
    if 'assertion' not in request.form:
        abort(400)

    data = {'assertion': request.form['assertion'],
            'audience': 'http://localhost:5000'}
    resp = requests.post('https://verifier.login.persona.org/verify',
                         data=data, verify=True)

    if resp.ok:
        verification_data = json.loads(resp.content)
        print verification_data['status']
        if verification_data['status'] == 'okay':
            session.update({'email': verification_data['email']})
            return 'You are logged in'
    abort(500)


@app.route('/auth/logout', methods=['POST'])
def logout():
    return jsonify(status='success')

if __name__ == "__main__":
    app.debug = True
    app.run()
