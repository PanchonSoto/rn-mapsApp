import { StyleSheet, View } from "react-native";
import { Map } from "../../components/Map";
import { getCurrentLocation } from "../../../actions/location/location";



export const MapScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Map /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      ...StyleSheet.absoluteFillObject,
  },
});
