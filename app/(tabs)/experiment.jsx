import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, FlatList, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

// Function to fetch media assets from the library
const fetchAssets = async (after, setAssets, setAfter, setHasNextPage) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Permission to access media library is required."
      );
      return;
    }

    const { assets, endCursor, hasNextPage } =
      await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 100, // Fetch 100 assets at a time
        after,
        sortBy: [MediaLibrary.SortBy.creationTime], // Sort by creation time in ascending order
      });

    const assetsWithInfo = await Promise.all(
      assets.map(async (asset) => {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        return { ...asset, fileUri: assetInfo.localUri || assetInfo.uri };
      })
    );

    setAssets((prevAssets) => [...prevAssets, ...assetsWithInfo]);
    setAfter(endCursor);
    setHasNextPage(hasNextPage);
  } catch (error) {
    Alert.alert("Error", "An error occurred while fetching assets.");
  }
};

// React component to display fetched images
const MyComponent = () => {
  const [assets, setAssets] = useState([]);
  const [after, setAfter] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    fetchAssets(null, setAssets, setAfter, setHasNextPage);
  }, []);

  const fetchMoreAssets = useCallback(() => {
    if (hasNextPage) {
      fetchAssets(after, setAssets, setAfter, setHasNextPage);
    }
  }, [after, hasNextPage]);

  const renderItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.fileUri }}
        style={{ width: 100, height: 100, margin: 5 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {assets.length > 0 ? (
        <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={3}
          onEndReached={fetchMoreAssets}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            hasNextPage ? <Text>Loading more...</Text> : null
          }
        />
      ) : (
        <Text>Loading assets...</Text>
      )}
    </View>
  );
};

export default MyComponent;
