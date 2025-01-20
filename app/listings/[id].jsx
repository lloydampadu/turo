import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
  Animated as A,
  Dimensions,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { HeightSpacer, Rating, ReusableText } from "../../components";
import GlobalStyle from "../../constants/GlobalStyle";
import { COLORS, SIZES } from "../../constants/theme";
import uidata from "../../constants/uidata";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const Page = () => {
  const { id } = useLocalSearchParams();
  const listing = uidata.productListings.find((item) => item._id === id);
  const [count, setCount] = useState(0);

  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  const width = Dimensions.get("window").width;
  const scrollX = new A.Value(0);
  let position = A.divide(scrollX, width);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <View style={{ position: "relative" }}>
          <Animated.FlatList
            data={listing.imagesUrl}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.card}
            scrollEnabled
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").width}
            bounces={false}
            onScroll={A.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }) => (
              <Animated.Image
                source={{ uri: item }}
                style={[styles.image, imageAnimatedStyle]}
                resizeMode="cover"
              />
            )}
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
              position: "absolute",
              bottom: 0,
            }}
          >
            {listing.imagesUrl
              ? listing.imagesUrl.map((_, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  });
                  return (
                    <A.View
                      key={index}
                      style={{
                        width: "16%",
                        height: 2.4,
                        backgroundColor: COLORS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                        bottom: 0,
                      }}
                    />
                  );
                })
              : null}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Image
                source={{ uri: listing.imagesUrl[0] }}
                style={{ width: 50, height: 50, borderRadius: 100 }}
                resizeMode="cover"
              />

              {/* <Text>{listing.host_name}</Text> */}

              <View>
                <ReusableText
                  text={listing.host_name}
                  family={"regular"}
                  size={SIZES.medium}
                  color={"black"}
                />
                <ReusableText
                  text={"5 mins walk"}
                  family={"regular"}
                  size={SIZES.small}
                  color={"gray"}
                />
              </View>
            </View>

            <Rating />
          </View>

          <HeightSpacer height={15} />

          <View>
            <ReusableText
              text={listing.name}
              family={"bold"}
              size={SIZES.medium}
              color={"black"}
            />

            <HeightSpacer height={10} />

            <ReusableText
              text={`GHS ${listing.price}`}
              family={"regular"}
              size={SIZES.large}
              color={COLORS.primary}
            />

            {/* <Text style={styles.price}>GHS{listing.price}</Text> */}
            {/* <Text style={styles.description}>{listing.shortDescription}</Text> */}
            {/* <Text style={styles.condition}>Condition: {listing.condition}</Text> */}
            {/* <Text style={styles.location}>Location: {listing.location}</Text> */}
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.header}>Recommendation</Text>

          {/* {uidata.nearbyStores.map((store) => (
            <View key={store.id} style={styles.storeContainer}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeLocation}>{store.location}</Text>
            </View>
          ))} */}

          <View style={styles.divider}></View>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={GlobalStyle.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              GlobalStyle.btn,
              { paddingRight: 20, paddingLeft: 20, marginLeft: "auto" },
            ]}
            onPress={() => router.push("orderPage")}
          >
            <Text style={GlobalStyle.btnText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <StatusBar backgroundColor="transparent" translucent={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT + 50,
    width: width,
  },
  infoContainer: {
    marginTop: 12,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: COLORS.primary,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
  condition: {
    fontSize: 16,
    fontFamily: "mon",
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    fontFamily: "mon",
    marginTop: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    marginVertical: 16,
  },
  storeContainer: {
    marginTop: 12,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "regular",
  },
  storeLocation: {
    fontSize: 16,
    fontFamily: "mon",
    color: COLORS.grey,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    fontFamily: "mon-sb",
  },
});

export default Page;
