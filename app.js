var express = require("express");
var app = express();

var restaurants = [{
	id:1,
	name:"Lucky Wings"
},
{
	id:2,
	name:"McDonald's"
},
{
	id:3,
	name:"Test"
}
];
var dishes = [
{
	restaurant_id: 1,
	name: "10 Buffallo Wings",
	price: 99
},
{
	restaurant_id: 1,
	name: "20 Buffallo Wings",
	price: 189
},
{
	restaurant_id: 2,
	name: "Happy Meal",
	price: 60
}
];

app.get("/restaurants", function(request, response){
	//Get all restaurants
	response.send(restaurants);
});

app.get("/restaurants/:restaurant_name", function(request,response){
	//Get a specific restaurant (i.e. localhost:3000/restaurants/Lucky Wings)
	var result = restaurants.filter(function( obj ) {
		return obj.name == request.params.restaurant_name;
	});
	response.send(result);
});

app.get("/dishes", function(request,response){
	//Get all dishes or dishes by restaurant (i.e. localhost:3000/dishes?restaurant_id=1)
	if(!request.query.restaurant_id){
		response.send(dishes);
	}
	else{
		var result = dishes.filter(function( obj ) {
			return obj.restaurant_id == request.query.restaurant_id;
		});
		response.send(result);
	}
});

app.get("/restaurants/:restaurant_name/dishes", function(request,response){
	//Get all dishes or dishes by restaurant (i.e. localhost:3000/restaurant/Lucky Wings/dishes)

	//Get restaurant ID from name
	var restaurant = restaurants.filter(function( obj ) {
		return obj.name == request.params.restaurant_name;
	});

	var result = dishes.filter(function( obj ) {
		return obj.restaurant_id == restaurant[0].id;
	});
	response.send(result);
});

app.listen(3000, console.log("Listening on port 3000"));