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
} from "react-native";
import { Colors, Keywords } from "./auto";
import { googleAPIKey, placeType } from "./helpers/GooglePlacesAPI";
import NearbyPlaceItem from "./components/NearbyPlaceItem";
import Loader from "./components/Loader";
import { Images } from "./auto/images";

const { width, height } = Dimensions.get("window");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNearbyPlaces();
  }

  // This arrow function will contain locations received from Google Places API.
  renderNearbyPlaces = (itemData) => {
    const info = itemData.item;
    return <NearbyPlaceItem name={info.name} />;
  };

  fetchNearbyPlaces = async () => {
    // Set a location latitude & longitude.
    const latitude = 37.773972;
    const longitude = -122.431297;

    // Search within maximum 4 km radius.
    let radius = 4 * 1000;

    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude +
      "," +
      longitude +
      "&radius=" +
      radius +
      "&key=" +
      googleAPIKey;

    // const urlWithPlaceType =
    // "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    // latitude +
    // "," +
    // longitude +
    // "&radius=" +
    // radius +
    // "&type=" +
    // placeType +
    // "&key=" +
    // googleAPIKey;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          places: res.results.map((x) => ({
            name: x.name,
          })),
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { places, loading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subView}>
          <Text style={styles.header}>{Keywords.nearby}</Text>
          {!loading ? (
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
                      <Image style={styles.errorImage} source={Images.error} />
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
          ) : (
            <View />
          )}
        </View>
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
  subView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  header: {
    fontWeight: "600",
    fontSize: 20,
    color: Colors.navy,
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
    color: Colors.navy,
    textAlign: "center",
    marginTop: 20,
  },
});

export default App;
