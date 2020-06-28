import React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIndicator } from "react-native-indicators";
import { Colors } from "../auto/index";

const Loader = (props) => {
  return props.smallLoader ? (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.65)",
        },
        props.style,
      ]}
    >
      <MaterialIndicator size={50} color={Colors.bloodOrange} />
    </View>
  ) : (
    <Modal transparent visible={props.loading}>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.75)",
          }}
        >
          <MaterialIndicator size={50} color={Colors.bloodOrange} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Loader;
