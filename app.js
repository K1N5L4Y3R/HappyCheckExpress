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
	id:1,
	restaurant_id: 1,
	name: "10 Buffallo Wings",
	price: 99
},
{
	id:2,
	restaurant_id: 1,
	name: "20 Buffallo Wings",
	price: 189
},
{
	id:3,
	restaurant_id: 2,
	name: "Happy Meal",
	price: 60
}
];
var tables = [
	{
		restaurant_id: 1,
		number: 1,
		description: "Just around the corner"
	},
	{
		restaurant_id: 1,
		number: 2,
		description: "Just beside the bathroom"
	},
	{
		restaurant_id: 2,
		number: 1,
		description: "With movable chairs"
	},
	{
		restaurant_id: 3,
		number: 1,
		description: "Test table"
	},
];
var orders=[
	{
		id: 1,
		restaurant_id: 1,
		table_number: 1,
		dishes: [
			{
				dish_id: 1,
				count: 1
			},
			{
				dish_id: 1,
				count: 2
			}
		],
		delivered:true
	}
];

app.get("/", function(request, response){
	response.send("Index");
});

app.get("/restaurants", function(request, response){ 	//Get all restaurants
	response.send(restaurants);
});

app.get("/restaurants/:restaurant_name", function(request,response){	//Get a specific restaurant (i.e. localhost:3000/restaurants/Lucky Wings)
	response.send(findBy(restaurants,"name", request.params.restaurant_name));
});

app.get("/restaurants/:restaurant_name/dishes", function(request,response){		//Get all dishes or dishes by restaurant (i.e. localhost:3000/restaurant/Lucky Wings/dishes)
	//Get restaurant ID from name
	var restaurant = findBy(restaurants, "name", request.params.restaurant_name)[0].id;

	response.send(findBy(dishes,"restaurant_id", restaurant));
});

app.get("/restaurants/:restaurant_name/tables/", function(request,response){	//Get all tables for a restaurant
	//Get restaurant ID from name
	var restaurant = findBy(restaurants, "name", request.params.restaurant_name)[0].id;

	response.send(findBy(tables, "restaurant_id", restaurant));
});

app.get("/restaurants/:restaurant_name/orders/", function(request, response){
	//Get restaurant ID from name
	var restaurant = findBy(restaurants, "name", request.params.restaurant_name)[0].id;

	allRestaurantOrders = findBy(orders, "restaurant_id", restaurant);
	if(request.query.delivered=="true"){
		response.send(findBy(allRestaurantOrders, "delivered", true));
	}
	else if(request.query.delivered=="false"){
		response.send(findBy(allRestaurantOrders, "delivered", false));
	}
	else{
		response.send(allRestaurantOrders);
	}
});

function findBy(arrayOfObjects, property, value){
	var finalArray = [];
	var result = arrayOfObjects.filter(function(obj){
		if(obj[property] == value){
			finalArray.push(obj);
		}
	});
		return finalArray;
}

app.listen(3000, console.log("Listening on port 3000")); 