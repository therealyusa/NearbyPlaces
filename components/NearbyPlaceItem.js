import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../auto";

const NearbyPlaceItem = (props) => {
  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.container}>
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
    height: 80,
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
  name: {
    color: Colors.navy,
    fontWeight: "normal",
    textAlign: "center",
    marginTop: 10,
  },
});

export default NearbyPlaceItem;
