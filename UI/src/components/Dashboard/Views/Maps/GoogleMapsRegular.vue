<template>
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <div id="regularMap" class="map" style="height: 283px"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { API_KEY } from "./API_KEY";
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = API_KEY;

export default {
  methods: {
    initRegularMap(google) {
      // Regular Map
      const myLatlng = new window.google.maps.LatLng(40.748817, -73.985428);
      const mapOptions = {
        zoom: 8,
        center: myLatlng,
        scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
      };

      const map = new window.google.maps.Map(
        document.getElementById("regularMap"),
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: myLatlng,
        title: "Regular Map!"
      });

      marker.setMap(map);
    }
  },
  mounted() {
    GoogleMapsLoader.load(google => {
      this.initRegularMap(google);
    });
  }
};
</script>
<style>
</style>
