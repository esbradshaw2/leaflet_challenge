var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load earthquake data from USGS GeoJSON Feed
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
fetch(url)
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            var magnitude = feature.properties.mag;
            var depth = feature.geometry.coordinates[2];
            var marker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                radius: magnitude * 5,
                fillColor: getColor(depth),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup(`Magnitude: ${magnitude}<br>Depth: ${depth}`);
        });
    });

// Function to determine color based on depth
function getColor(depth) {
    // Define your color logic here
    return depth > 100 ? '#FF0000' : '#008000';
}