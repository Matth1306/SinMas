<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-map card">
        <div class="card-header">
          <h4 class="card-title">Global Sites</h4>
        </div>
        <div class="card-body card-local">
          <div id="mapsite" class="map-local"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyDL-imf29QugRQMnO6PHnrF5xmQsWhFSp8";
import axios from "axios";

export default {
  data() {
    return {
      siteLat: []
    };
  },
  beforeCreate() {
    // this.$store.dispatch("removeDroplistCek");
    // this.$store.commit("hideTitle");
  },
  created() {
    this.$store.commit("setIsTopNavbarSelect", false);
    axios
      .get(
        "http://103.126.226.54:4000/api/dashboard/map/" +
          this.$store.state.userId,
        { headers: { token: this.$store.state.tokenId } }
      )
      .then(response => {
        console.log(response);
        this.siteLat = response.data;
        this.initSattelliteMap(google);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    initSattelliteMap(google) {
      // Satellite Map
      const centerlat = new window.google.maps.LatLng(0.340199, 116.472123);
      const mapOptions = {
        zoom: 5,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        center: centerlat,
        mapTypeId: window.google.maps.MapTypeId.roadmap
      };
      const map = new window.google.maps.Map(
        document.getElementById("mapsite"),
        mapOptions
      );
      for (var i = 0; i < this.siteLat.length; i++) {
        console.log(this.siteLat[0].latlong);
        const pos = new window.google.maps.LatLng(
          this.siteLat[i].latlong.lat,
          this.siteLat[i].latlong.lng
        );
        const markers = new window.google.maps.Marker({
          position: pos,
          map: map,
          title: this.siteLat[i].milsName,
          // url: this.siteLat[i][3]
          url: "/dashboard/overview"
        });
        markers.setMap(map);
        // var dataList = this.siteLat;
        const isiDataList = (data, name) => {
          this.$store.dispatch("clearListId");
          this.$store.dispatch("tempList", { list: "", name: "" });
          this.$store.dispatch("tempList", { list: data, name: name });
          this.$store.dispatch("getTitle", { data: name });

          this.$router.push("/dashboard/overview");
        };

        markers.addListener("click", function() {
          isiDataList(markers.url, markers.title);
        });
      }
    }
  },
  mounted() {
    GoogleMapsLoader.load(google => {
      this.initSattelliteMap(google);
    });
  },
  beforeMount() {}
};
</script>
<style scoped>
.card-local {
  padding: 10px 10px 10px 10px;
}
.map-local {
  height: calc(100vh - 247px);
}
</style>
