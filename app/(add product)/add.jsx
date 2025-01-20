import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Animated,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import useImageStore from "../../context/useImageStore";
import { COLORS } from "../../constants/theme";

const { width } = Dimensions.get("window");

export default function App() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const selectedImages = useImageStore((state) => state.selectedImages);
  const setSelectedImages = useImageStore((state) => state.setSelectedImages);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermissionGranted(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Permission to access media library is required."
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (permissionGranted) {
      (async () => {
        setLoading(true);
        const { assets } = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.photo,
          first: 50,
        });
        const assetsWithUris = await Promise.all(
          assets.map(async (asset) => {
            const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);
            return { ...asset, uri: assetInfo.localUri || assetInfo.uri };
          })
        );
        setAssets(assetsWithUris);
        if (assetsWithUris.length > 0) {
          setSelectedImages([assetsWithUris[0]]);
        }
        setLoading(false);
      })();
    }
  }, [permissionGranted]);
  const handlePress = (item) => {
    if (isMultiSelect) {
      const isSelected = selectedImages.some((image) => image.id === item.id);

      // If the item is already selected and it's the only item selected, deactivate multi-select
      if (isSelected && selectedImages.length === 1) {
        setIsMultiSelect(false);

        setSelectedImages([item]);
        return;
      }

      const newSelectedImages = isSelected
        ? selectedImages.filter((image) => image.id !== item.id)
        : [...selectedImages, item];

      // If only one item is left, deactivate multi-select

      if (newSelectedImages.length === 1) setIsMultiSelect(false);
      setSelectedImages(newSelectedImages);
    } else {
      // Single selection mode: select the tapped item
      setSelectedImages([item]);
    }
  };

  const handleLongPress = (item) => {
    setIsMultiSelect(true);

    if (selectedImages.length === 1 && selectedImages[0].id !== item.id) {
      // One item is selected and a different item is long pressed

      setSelectedImages([item]);
      return;
    }
  };

  const renderSkeletonItem = () => (
    <View style={styles.skeletonContainer}>
      <View style={[styles.skeletonImage]} />
    </View>
  );

  const renderSkeletonCameraIcon = () => (
    <View style={styles.skeletonCameraIcon} />
  );

  // Animation for pulsating effect
  const animatedValue = useRef(new Animated.Value(0.5)).current;

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(animatedValue, {
  //         toValue: 1,
  //         duration: 800,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(animatedValue, {
  //         toValue: 0.5,
  //         duration: 800,
  //         useNativeDriver: true,
  //       }),
  //     ])
  //   ).start();
  // }, [animatedValue]);

  const renderItem = ({ item }) => {
    const isSelected = selectedImages.some((image) => image.id === item.id);
    const selectionIndex =
      selectedImages.findIndex((image) => image.id === item.id) + 1;
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        onLongPress={() => handleLongPress(item)}
        style={[styles.imageContainer, isSelected && styles.selectedImage]}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        {isMultiSelect && (
          <View style={styles.circleOverlay}>
            {isSelected && (
              <Text style={styles.selectionCountText}>{selectionIndex}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.skeletonLoader}>
          {/* Render a skeleton for the selected image */}
          <View style={styles.selectedImageContainer}>
            <View style={[styles.skeletonSelectedImage]} />
          </View>
          {/* Render skeleton placeholders for the camera icon */}
          <View style={styles.cameraIconContainer}>
            {renderSkeletonCameraIcon()}
          </View>
          {/* Render skeleton placeholders for the grid */}
          <FlatList
            data={Array.from({ length: 12 }, (_, index) => index.toString())} // Placeholder items
            keyExtractor={(item) => item}
            renderItem={renderSkeletonItem}
            numColumns={4}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <>
          <View style={styles.selectedImageContainer}>
            <FlatList
              data={selectedImages.slice().reverse()}
              horizontal
              contentContainerStyle={styles.selectedImageList}
              renderItem={({ item }) => (
                <Image source={{ uri: item?.uri }} style={styles.fullImage} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.cameraIconContainer}>
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera-outline" size={26} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={assets}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={4}
          />
          {selectedImages.length > 0 && (
            <View style={styles.selectedImagesContainer}>
              {selectedImages
                .slice()
                .reverse()
                .map((image) => (
                  <Image
                    key={image.id}
                    source={{ uri: image.uri }}
                    style={styles.selectedThumbnail}
                  />
                ))}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImageContainer: {
    height: "50%",
  },
  selectedImageList: {
    backgroundColor: "#e0e0e0",
  },
  fullImage: {
    height: "100%",
    width: width,
  },
  cameraIconContainer: {
    margin: 12,
    marginLeft: "auto",
  },
  cameraIcon: {
    backgroundColor: "rgba(0, 0,0,0.05)",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    aspectRatio: 1,
  },
  imageContainer: {
    // marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: (width - 16) / 4 - 4,
    height: (width - 16) / 4 - 4,
    margin: 2,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  selectedImage: {
    borderColor: COLORS.black,
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
  },
  circleOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  selectionCountText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6e3b6e",
  },
  selectedImagesContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedThumbnail: {
    width: 50,
    height: 50,
    margin: 2,
  },
  // Skeleton styles
  skeletonLoader: {
    flex: 1,
  },
  skeletonContainer: {
    justifyContent: "center",
    flex: 1,
    width: (width - 16) / 4 - 4,
    height: (width - 16) / 4 - 4,
    margin: 2,
    backgroundColor: "#f0f0f0", // Light gray
    borderRadius: 5,
  },
  skeletonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#e0e0e0", // Slightly darker gray
  },
  skeletonSelectedImage: {
    width: width,
    height: "100%",
    backgroundColor: "#e0e0e0", // Slightly darker gray
  },
  skeletonCameraIcon: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "#e0e0e0", // Slightly darker gray
    margin: 12,
    marginLeft: "auto",
  },
});
