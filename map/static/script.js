const map = L.map('map').setView([22.9074872, 79.07306671], 5);

const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tiles = L.tileLayer(titleUrl, { attribution });
let myList = [];
tiles.addTo(map);
async function random() {
  fetch('/send_data')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][1];
        const lng = data[i][2];
        
        const category = data[i][3];
        let markerColor;

        switch (category) {
          case "Food":
            markerColor = "green";
            break;
          case "Water":
            markerColor = "blue";
            break;
          case "Medics":
            markerColor = "red";
            break;
          default:
            markerColor = "gray";
        }

        try {
          const marker = L.circleMarker([lat, lng], {
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: 0.8,
            radius: 8
          });
          marker.bindPopup(`${data[i][0]}`).addTo(map);
          myList.push([marker]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    });
}

async function foodselect() {
  fetch('/food')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][1];
        const lng = data[i][2];
        const category = data[i][3];
        let markerColor;

        switch (category) {
          case "Food":
            markerColor = "green";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

async function waterselect() {
  fetch('/water')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][1];
        const lng = data[i][2];
        const category = data[i][3];
        let markerColor;

        switch (category) {
          case "Water":
            markerColor = "blue";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

async function medicsselect() {
  fetch('/medics')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const lat = data[i][1];
        const lng = data[i][2];
        const category = data[i][3];
        let markerColor;

        switch (category) {
          case "Medics":
            markerColor = "red";
            break;
          default:
            markerColor = "gray";
        }
        const marker = L.circleMarker([lat, lng], {
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.8,
          radius: 8
        });
        marker.bindPopup(`${data[i][0]}`).addTo(map);
        myList.push([marker]);
      }
    });
}

function removeAllMarkers() {

  for (const marker of myList) {
    map.removeLayer(marker[0]);
  }
  myList = [];
}



const dropdown = document.getElementById("myDropdown");
if (dropdown.value) {
  random()
}
dropdown.addEventListener("change", function () {
  const selectedValue = this.value;
  console.log("Selected value:", selectedValue);
  if (selectedValue == "all") {
    random()
  } else if (selectedValue == "food") {
    removeAllMarkers()
    foodselect()
  } else if (selectedValue == "water") {
    removeAllMarkers()
    waterselect()
  } else if (selectedValue == "medics") {
    removeAllMarkers()
    medicsselect()
  }

});

