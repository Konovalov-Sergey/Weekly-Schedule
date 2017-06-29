
(function() {

	$.getJSON( "source/input.json", function(data) {
		// console.log(data);
		//parsing JSON data
		for (var days in data) {
			if (data[days].length) {
				for (var hour in data[days]) {
					var bt = Math.floor(data[days][hour].bt/60);
					var et = Math.floor(data[days][hour].et/60);
					// adding 'reserve' class to cells according to JSON data
					for (var i = bt; i <= et; i++) {
						$('#' + days + ' .' + i).addClass("reserve");
					}
				}
			}
		};
		selectDate();
	})
	.fail(function() {
		console.log( "File not found" );
	});

function selectDate(){
	var isMouseDown = false;
	var isReserve, str;

	$("#table td:not(.allDay, .dayOfWeek)").bind( "mousedown mouseover", function(e) {
		var el = $(this);

		if (e.type == 'mousedown' && e.which == 1){ // e.which only left mouse button
			isMouseDown = true;
			el.toggleClass("reserve");
			isReserve = el.hasClass("reserve");
		}

		if (e.type == 'mouseover'){
			if (isMouseDown) {
				el.toggleClass("reserve", isReserve);
			}
		}

	});

	$(document).mouseup(function () {
		isMouseDown = false;
	});

	$(".allDay").click(function(){
		var el = $(this)
		if (el.hasClass('reserve')){
			el.parent().children('.reserve').removeClass('reserve');
		}
		else{
			el.parent().children().addClass('reserve');
		}
	});

	$(".clear").click(function(){
		$(".reserve").removeClass("reserve");
	});
	$(".save").click(function(){
		var store ={};
		var map = new Map();
		$('#table tbody tr').each(function(i){
			var row = $(this);
			var cells = row.children('.reserve').not('.allDay, .dayOfWeek'),
				bt = 0,
				et = 0,
				flag = false;
			map.set(row.prop('id'));
			for (var j = 0; j < cells.length; j++){
				if (!flag){
					flag = true;
					cell = $(cells[j]);
					var time = cell.prop('class').split(' ');
					time.splice( time.indexOf('reserve'), 1 );
					bt = time * 60;
					map.set(row.prop('id'), ['bt:'+bt]);
				}
			}
		});
		console.log(JSON.stringify([...map]));
	});
}
})();
