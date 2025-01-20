import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const { width } = Dimensions.get("window");
const PICKER_SIZE = width * 0.9;
const PICKER_RADIUS = PICKER_SIZE / 2;
const THUMB_RADIUS = 20;

const ColorPicker = ({ onSelectColor }) => {
  const theta = useSharedValue(0);
  const radius = PICKER_RADIUS - THUMB_RADIUS;

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startTheta = theta.value;
    },
    onActive: (event, ctx) => {
      const x = event.translationX;
      const y = event.translationY;
      const angle = Math.atan2(y, x);
      theta.value = angle + ctx.startTheta;
    },
    onEnd: () => {
      theta.value = withSpring(theta.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const x = radius * Math.cos(theta.value);
    const y = radius * Math.sin(theta.value);
    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  const color = useDerivedValue(() => {
    return interpolateColor(
      theta.value,
      [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI],
      ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]
    );
  });

  return (
    <View style={styles.container}>
      <Svg width={PICKER_SIZE} height={PICKER_SIZE}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ff0000" />
            <Stop offset="25%" stopColor="#00ff00" />
            <Stop offset="50%" stopColor="#0000ff" />
            <Stop offset="75%" stopColor="#ffff00" />
            <Stop offset="100%" stopColor="#ff00ff" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={PICKER_RADIUS}
          cy={PICKER_RADIUS}
          r={PICKER_RADIUS - THUMB_RADIUS}
          fill="url(#grad)"
        />
      </Svg>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.thumb, animatedStyle]} />
      </PanGestureHandler>
      <Button title="OK" onPress={() => onSelectColor(color.value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#000000",
    position: "absolute",
  },
});

export default ColorPicker;
