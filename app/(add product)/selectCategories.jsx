import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput } from "react-native";
import { HeightSpacer } from "./../../components/index";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import useImageStore from "../../context/useImageStore";

const index = () => {
  const [image, setImage] = useState(null);

  const selectedImages = useImageStore((state) => state.selectedImages);

  console.log(selectedImages.map((item) => item.id));
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = (value) => {
    value.image = image;
    console.log(value);
  };

  const numberOfLines = 5;
  return (
    <SafeAreaView style={{ marginHorizontal: 12 }}>
      <Formik
        initialValues={{
          title: "",
          desc: "",
          category: "",
          address: "",
          image: "",
        }}
        onSubmit={(value) => onSubmitMethod(value)}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            console.log("Title not present");
            errors.name = "title must be there";
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            {/* <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <Image
                  source={require("./../../assets/images/image-processing.png")}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              )}
            </TouchableOpacity> */}

            <FlatList
              data={selectedImages.slice().reverse()}
              horizontal
              contentContainerStyle={styles.selectedImageList}
              renderItem={({ item }) => (
                <Image source={{ uri: item?.uri }} style={styles.fullImage} />
              )}
              keyExtractor={(item) => item.id}
            />
            <HeightSpacer height={15} />

            <TextInput
              style={styles.input}
              placeholder="Title"
              values={values?.title}
              onChangeText={handleChange("title")}
            />

            <HeightSpacer height={15} />

            <TextInput
              style={styles.input}
              placeholder="Description"
              values={values?.desc}
              numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
              minHeight={
                Platform.OS === "ios" && numberOfLines
                  ? 20 * numberOfLines
                  : null
              }
              onChangeText={handleChange("desc")}
            />

            <HeightSpacer height={15} />

            <TextInput
              style={styles.input}
              placeholder="Price"
              values={values?.price}
              keyboardType="number-pad"
              onChangeText={handleChange("price")}
            />

            <HeightSpacer height={15} />

            <Picker
              selectedValue={values?.category}
              onValueChange={handleChange}
            >
              <Picker.Item label="Dropdown1" value={"Dropdown"} />
            </Picker>

            <HeightSpacer height={15} />

            <Button onPress={handleSubmit} title="submit" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // textAlignVertical: "top",
  },
  selectedImageList: {
    backgroundColor: "#e0e0e0",
  },
  fullImage: {
    height: 100,
    width: 100,
  },
});
