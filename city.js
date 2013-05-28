define(["vec2"], function (Vec2) {
	function City() {
		this.house = null;
		this.gold = 0;
		this.rate = 1;
		this.position = new Vec2(0, 0);
	}

	return City;
});
