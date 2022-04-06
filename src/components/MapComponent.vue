<template>
  <div id="map"></div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

export default {
  mounted() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/calon719/cl1dlmiyt003j14pbgaypf6m3',
      center: [120.296464, 22.653975],
      zoom: 18,
    });

    map.on('load', () => {
      new mapboxgl.Marker({
        color: '#ed0000',
      }).setLngLat([120.296464, 22.653975]).addTo(map);
    });
  },
};
</script>
