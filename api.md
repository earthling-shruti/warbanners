# Warbanners REST API

### State

* GET /all
* GET /all/player {player}
* GET /all/house {house}

### Board

* GET /board
* GET /board/area {x1, y1, x2, y2}
* GET /board/radius	{x, y, r}

### Cities

* GET /city
* GET /city/:id
* POST /city/build/	{x, y, name}
* POST /city/:id/capitol
* POST /city/:id/rename

### Armies

* GET /army
* GET /army/:id
* POST /army/:id/move {x, y}

### Players

* GET /player
* GET /player/:id
* GET /player/:id/cities
* GET /player/:id/armies
* GET /player/:id/history
* GET /player/:id/land

### Houses

* GET /house
* GET /house/:id
* GET /house/:id/cities
* GET /house/:id/armies
* GET /house/:id/land
* GET /house/:id/history
* POST /house/:id/ally
* POST /house/:id/betray

### History
{turns}

* GET /history
* GET /history/moved
* GET /history/alliances
* GET /history/built