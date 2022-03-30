<template>
  <div id="map"></div>
</template>

<script>
/* global mapboxgl */

export default {
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiY2Fsb243MTkiLCJhIjoiY2wxZGxlcG5lMGlzMDNwbnhnMmpobHU1NCJ9.JAz76_HD3rIXxl_UMfqyRQ',
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/calon719/cl1dlmiyt003j14pbgaypf6m3',
      center: [120.296464, 22.653975],
      zoom: 18,
    });

    new mapboxgl.Marker()
      .setLngLat([120.296464, 22.653975])
      .addTo(map);
  },
};
</script>
