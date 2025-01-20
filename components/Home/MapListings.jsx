import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { COLORS, SIZES } from "../../constants/theme.js";
import uidata from "../../constants/uidata.js";
import useStoreRegion from "../../context/useStoreRegion.js";
import HomeListItem from "./HomeListItem.jsx";

const isIOS = Platform.OS === "ios";

const MapListings = () => {
  const navigation = useNavigation();

  const mapRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);

  const initialRegion = useStoreRegion((state) => state.initialRegion);

  const customMapStyle = [
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.label",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },

    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    // {
    //   featureType: "administrative.land_parcel",
    //   elementType: "all",
    //   stylers: [
    //     {
    //       visibility: "o",
    //     },
    //   ],
    // },
    {
      featureType: "administrative.locality",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
  ];

  {
    isIOS ? { right: 0, bottom: 60, left: 0 } : null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        animationEnabled={false}
        tracksViewChanges={true}
        // mapPadding={
        //   isIOS
        //     ? {
        //         right: 0,
        //         bottom: isIOS && SIZES.width > 700 ? 85 : 60,
        //         left: 0,
        //       }
        //     : null
        // }
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: initialRegion?.latitude || 5.6727845,
          longitude: initialRegion?.longitude || -0.2722205,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled
        zoomEnabled
        rotateEnabled={false}
        ref={mapRef}
        customMapStyle={customMapStyle}
      >
        {uidata.stores.map((item) => (
          <Marker
            key={item._id}
            calloutEnabled={false}
            onPress={() => setSelectedItem(item)}
            coordinate={{
              latitude: item.coords.latitude,
              longitude: item.coords.longitude,
            }}
          >
            <View style={styles.marker}>
              <Image
                source={{ uri: item.logoUrl }}
                style={{
                  width: 50,
                  aspectRatio: 1,
                  borderRadius: 99,
                }}
                backgroundColor={COLORS.gray}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedItem && (
        <HomeListItem
          item={selectedItem}
          onPress1={() => setSelectedItem(null)}
        />
      )}
    </View>
  );
};

export default MapListings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: COLORS.lightWhite,
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
    width: 50,
    aspectRatio: 1,
    // padding: 20,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  markerText: {
    fontFamily: "medium",
    fontSize: 14,
  },
});
