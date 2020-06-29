import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";
import GetLocation from "react-native-get-location";
import { Colors, Keywords, MapStyle } from "./auto";
import { googleAPIKey, placeType } from "./helpers/GooglePlacesAPI";
import NearbyPlaceItem from "./components/NearbyPlaceItem";
import { Images } from "./auto/images";

const { width, height } = Dimensions.get("window");

const initialRegion = {
  latitude: 41.015137,
  longitude: 28.97953,
  latitudeDelta: 0.122,
  longitudeDelta: 0.121,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      places: [],
      openModal: false,
    };
  }
  openNearbyPlacesModal = () => {
    this.setState({ openModal: true });
  };

  closeNearbyPlacesModal = () => {
    this.setState({ openModal: false });
  };

  componentDidMount() {
    this.fetchNearbyPlaces();
  }

  // This arrow function will contain locations received from Google Places API.
  renderNearbyPlaces = (itemData) => {
    const info = itemData.item;
    return <NearbyPlaceItem name={info.name} />;
  };

  fetchNearbyPlaces = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
    // Get current location as latitude and longitude.
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude,
        });

        // Search within maximum 4 km radius.
        let radius = 4 * 1000;

        // const url =
        //   "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        //   latitude +
        //   "," +
        //   longitude +
        //   "&radius=" +
        //   radius +
        //   "&key=" +
        //   googleAPIKey;

        const url =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          location.latitude +
          "," +
          location.longitude +
          "&radius=" +
          radius +
          "&type=" +
          placeType +
          "&key=" +
          googleAPIKey;

        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            this.setState({
              places: res.results.map((x) => ({
                name: x.name,
              })),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  render() {
    const { places } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          customMapStyle={MapStyle}
          showsUserLocation={true}
          initialRegion={initialRegion}
        />
        <TouchableOpacity
          onPress={this.openNearbyPlacesModal}
          style={styles.nearbyPlacesTouchable}
        >
          <Image
            style={styles.nearbyPlacesImage}
            source={Images.nearbyPlaces}
          />
        </TouchableOpacity>
        {/* Open modal when user wants to see nearby places. */}
        {this.state.openModal && (
          <Modal
            transparent
            coverScreen
            hasBackdrop={true}
            animationType="fade"
            animationIn="slideInDown"
            isVisible={this.state.openModal}
          >
            <TouchableWithoutFeedback onPress={this.closeNearbyPlacesModal}>
              <SafeAreaView style={styles.subView}>
                <Text style={styles.header}>{Keywords.nearby}</Text>

                <ScrollView style={styles.scrollView} horizontal>
                  <FlatList
                    horizontal={false}
                    contentContainerStyle={styles.flatList}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => index.toString()}
                    data={places}
                    renderItem={(item) => this.renderNearbyPlaces(item)}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.errorView}>
                          <Image
                            style={styles.errorImage}
                            source={Images.error}
                          />
                          <Text
                            adjustsFontSizeToFit
                            numberOfLines={1}
                            style={styles.errorText}
                          >
                            {Keywords.notFetchData}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </ScrollView>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        {/* Open modal when user wants to see nearby places. */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  nearbyPlacesTouchable: {
    position: "absolute",
    right: 20,
    bottom: 50,
    borderRadius: 50,
    backgroundColor: Colors.white,
    padding: 10,
  },
  nearbyPlacesImage: { width: 40, height: 40 },
  subView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  header: {
    fontWeight: "600",
    fontSize: 20,
    color: Colors.white,
    textAlign: "left",
    margin: 20,
  },
  scrollView: { marginTop: 20 },
  flatList: {
    alignSelf: "flex-start",
  },
  errorView: {
    width: width * 0.7,
    height: height * 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  errorImage: { width: 200, height: 200 },
  errorText: {
    width,
    color: Colors.white,
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;
