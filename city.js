define(["vec2"], function (Vec2) {
	function City(player, x, y) {
		this.gold = 0;
		this.rate = 1;
		this.location = new Vec2(x, y);
	}

	return City;
});
