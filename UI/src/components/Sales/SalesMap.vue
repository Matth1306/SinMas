<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card-map card">
        <div class="card-header">
          <h4 class="card-title">Global Sales</h4>
        </div>
        <div class="card-body card-local">
          <div id="mapsite" class="map-local"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.KEY = "AIzaSyCnmN8coxn6zGLA51SPSE7st1QRqhTVfW8";

export default {
  created() {
    axios
      .get(
        "http://103.126.226.54:4000/api/sales/map/" + this.$store.state.userId,
        {
          headers: { token: this.$store.state.tokenId }
        }
      )
      .then(response => {
        this.mapData = response.data;
        this.initSattelliteMap(google);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      mapData: [
        {
          icon: "red-dot.png",
          loc: [5.552606, 95.321756],
          name: "PT Alpha Indonesia",
          url: ""
        },
        {
          icon: "red-dot.png",
          loc: [3.595195, 98.672139],
          name: "PT Bravo Indonesia",
          url: ""
        },
        {
          icon: "red-dot.png",
          loc: [0.507291, 101.44777],
          name: "PT Charlie Indonesia",
          url: ""
        },
        {
          icon: "red-dot.png",
          loc: [-0.947359, 100.417469],
          name: "PT Delta Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-1.610108, 103.613173],
          name: "PT Echo Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-2.976307, 104.775302],
          name: "PT Foxtrot Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-3.792886, 102.260276],
          name: "PT Golf Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-5.397139, 105.266653],
          name: "PT Hotel Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-2.128465, 106.114681],
          name: "PT India Indonesia",
          url: ""
        },
        {
          icon: "orange-dot.png",
          loc: [-6.1165, 106.153864],
          name: "PT Juliett Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-6.20809, 106.84583],
          name: "PT Kilo Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-6.917056, 107.618567],
          name: "PT Lima Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-7.005258, 110.437514],
          name: "PT Mike Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-7.794871, 110.368774],
          name: "PT November Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-7.256925, 112.750415],
          name: "PT Oscar Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-7.009218, 113.859113],
          name: "PT Papa Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-0.024035, 109.347172],
          name: "PT Quebec Indonesia",
          url: ""
        },
        {
          icon: "yellow-dot.png",
          loc: [-2.216001, 113.914105],
          name: "PT Romeo Indonesia",
          url: ""
        },
        {
          icon: "green-dot.png",
          loc: [-3.318411, 114.594676],
          name: "PT Sierra Indonesia",
          url: ""
        },
        {
          icon: "green-dot.png",
          loc: [-1.237915, 116.852925],
          name: "PT Tango Indonesia",
          url: ""
        },
        {
          icon: "green-dot.png",
          loc: [3.327171, 117.57864],
          name: "PT Uniform Indonesia",
          url: ""
        },
        {
          icon: "green-dot.png",
          loc: [-5.14766, 119.431458],
          name: "PT Victor Indonesia",
          url: ""
        },
        {
          icon: "green-dot.png",
          loc: [-3.42717, 119.353592],
          name: "PT Whiskey Indonesia",
          url: ""
        },
        {
          icon: "ltblue-dot.png",
          loc: [-3.998135, 122.513048],
          name: "PT X-Ray Indonesia",
          url: ""
        },
        {
          icon: "ltblue-dot.png",
          loc: [-0.900404, 119.878041],
          name: "PT Yankee Indonesia",
          url: ""
        },
        {
          icon: "ltblue-dot.png",
          loc: [0.543456, 123.056719],
          name: "PT Zulu Indonesia",
          url: ""
        },
        {
          icon: "ltblue-dot.png",
          loc: [1.474736, 124.842013],
          name: "PT Wun Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [1.311951, 128.484702],
          name: "PT Too Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [-0.646011, 127.487974],
          name: "PT Tree Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [-3.263019, 127.08472],
          name: "PT Fower Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [-3.68752, 128.206489],
          name: "PT Fife Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [-0.877144, 131.260874],
          name: "PT Six Indonesia",
          url: ""
        },
        {
          icon: "blue-dot.png",
          loc: [-0.865594, 134.07887],
          name: "PT Seven Indonesia",
          url: ""
        },
        {
          icon: "purple-dot.png",
          loc: [-3.370239, 135.490905],
          name: "PT Ait Indonesia",
          url: ""
        },
        {
          icon: "purple-dot.png",
          loc: [-4.544369, 136.900017],
          name: "PT Niner Indonesia",
          url: ""
        },
        {
          icon: "pink-dot.png",
          loc: [-8.502441, 140.41845],
          name: "PT Zeero Indonesia",
          url: ""
        }
      ]
    };
  },
  destroyed() {
    clearInterval(this.cekInterval);
  },
  methods: {
    initSattelliteMap(google) {
      const centerlat = new window.google.maps.LatLng(0, 119);
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
      for (var item of this.mapData) {
        const pos = new window.google.maps.LatLng(item.loc[0], item.loc[1]);
        let url = "http://maps.google.com/mapfiles/ms/icons/";
        url += item.icon;
        const markers = new window.google.maps.Marker({
          icon: {
            url: url
            //scaledSize: new google.maps.Size(38, 38)
          },
          position: pos,
          map: map,
          title: item.name,
          url: item.url
        });
        markers.setMap(map);
        const isiDataList = (data, name) => {
          this.$store.dispatch("clearListId");
          this.$store.dispatch("tempList", { list: "", name: "" });
          this.$store.dispatch("tempList", { list: data, name: name });
          this.$store.dispatch("getTitle", { data: name });

          this.$router.push("/dashboard/overview");
          markers.addListener("click", function() {
            isiDataList(markers.url, markers.title);
          });
        };
      }
    }
  },
  mounted() {
    GoogleMapsLoader.load(google => {
      this.initSattelliteMap(google);
    });
  },
  beforeMount() {
    this.$store.dispatch("removeDroplistCek");
    this.$store.commit("hideTitle");
  }
};
</script>
<style scoped>
.card-local {
  padding: 10px 10px 10px 10px;
}
.map-local {
  height: 732px;
}
</style>
