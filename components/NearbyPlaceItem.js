import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../auto";

const NearbyPlaceItem = (props) => {
  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.container}>
        {/* Comment the following line to use Places API, uncomment to use Yelp Fusion API. */}
        <Image style={styles.image} source={{ uri: props.image_url }} />
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.name}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  touchable: { marginVertical: 10, marginHorizontal: 5 },
  container: {
    borderRadius: 10,
    width: 120,
    height: 120,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 3,
    paddingHorizontal: 4,
  },
  // Comment the following styling to not use Yelp Fusion API.
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginTop: 10,
  },
  name: {
    flex: 1,
    color: Colors.navy,
    fontWeight: "normal",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default NearbyPlaceItem;
