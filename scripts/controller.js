$(document).ready(function() {
	var rowNumber = 1;
	var topicArray = [];

	$("#btn-connect").click (function() {
		client = mqtt.connect($("#address").val());
		client.on("connect", function(){
		    console.log("Successfully connected");
		    console.log("address: "+$("#address").val());
		})
		$("#connected-btn").val("Connected!");
		client.on("message", function (topic, payload) {
			console.log("Received { topic:"+topic+"; payload: "+payload+" }");
			$('tbody').append('<tr><td>' + topic + '<td>' + payload + '<td>'+moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
			rowNumber++;
		})
	})

	$("#btn-disconnect").click (function() {		
		client.end();
		$("#connected-btn").val("Disconnected!");
	});

	$("#btn-subscribe").click (function() {
		var topic = $("#topic-sub").val();
		client.subscribe(topic);	
		console.log("Subscribed { topic:" + topic+ " }");
		topicArray.push(topic);
		$("#subscribed-btn").val("Subscribed!");
	})

	$("#btn-unsubscribe").click (function() {
		var topic = $("#topic-sub").val();
		client.unsubscribe(topic);
		console.log("Unsubscribed { topic:" + topic+ " }");
		$("#subscribed-btn").val("Unsubscribed!");
	})

	$("#btn-publish").click (function() {
		var topic = $("#topic-pub").val();
		var payload = $("#payload-input").val();
		client.publish(topic, payload);
		console.log("Published { topic:"+topic+"; payload: "+payload+" }");
	})

	$("#btn-clear").click (function() {
		for (var i=rowNumber-1; i>=1; i--) {
			document.getElementById("tab").deleteRow(i);
		}
		rowNumber = 1;
	})
})




