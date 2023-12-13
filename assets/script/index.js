'use strict';

const button = document.querySelector('.login');
const dialog = document.querySelector('dialog');
const close = document.querySelector('span');
const mapContainer = document.getElementById('map');
const trackBtn = document.querySelector('#trackBtn');

button.addEventListener('click', () => {
    dialog.showModal();
});

close.addEventListener('click', () => {
    dialog.close();
})

dialog.addEventListener('click', (e) => {
    //console.log(e.target);
    const rect = e.target.getBoundingClientRect();

    if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
        dialog.close();
    }
})
 
trackBtn.addEventListener('click', showMap);
function showMap() {
    // Adjust the position of the track button when the map is displayed
    trackBtn.style.marginBottom = '0';
    // Adjust the height of the map container when the map is displayed
    mapContainer.style.height = '60vh';
    // Set the map container to visible
    mapContainer.style.visibility = 'visible';

    mapboxgl.accessToken = 'pk.eyJ1IjoiaHNpbXJhbnNpZGh1IiwiYSI6ImNscTQzbGRldzAyd2IyaXBrc2pxN3FjNGgifQ.6kdTBBAgB5wTYdvvlbDwUw';
    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0], // Initial center, will be updated with user's location
        pitch:40,
        zoom: 12 // Initial zoom level

    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Your Location'
    )
    
    // Get user's location and update the map
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            // Update map center to user's location
            map.setCenter([longitude, latitude]);

            // Add marker to user's location
            new mapboxgl.Marker({
                color: '#57fa7d',
                scale: 0.9
            })
                .setLngLat([longitude, latitude])
                .setPopup(popup)
                .addTo(map);
        },
        (error) => {
            console.error('Error getting user location:', error);
        }
    );

    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
        // set the default atmosphere style 
        map.setFog({});
    });
}

