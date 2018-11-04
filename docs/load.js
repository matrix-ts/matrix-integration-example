window.addEventListener("load", function() {
	loadEvents();
});

function loadEvents() {
	fetch("/events")
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			console.info("Event Updates", json);
			updateTable(json);
		})
		.finally(function() {
			loadEvents, 500);
		});
}

function updateTable(events) {
	var bodyID = "list"
	var oldBody = document.getElementById(bodyID);
	var newBody = document.createElement("tbody").setAttribute("id",bodyID);
	for (var i = 0; i < events.length; i++) {
		var row = newBody.insertRow();
		row.insertCell().appendChild(document.createTextNode(events[i].time));
		row.insertCell().appendChild(document.createTextNode(events[i].action));
		row.insertCell().appendChild(
			document.createTextNode(events[i].project)
		);
	}
	oldBody.parentNode.replaceChild(newBody, oldBody);
}
