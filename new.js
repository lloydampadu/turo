// import { useState, useEffect } from 'react';
// import { Button, Text, SafeAreaView, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
// import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';

// export default function App() {
//   const [albums, setAlbums] = useState(null);
//   const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

//   useEffect(() => {
//     if (!permissionResponse) {
//       requestPermission();
//     }
//   }, [permissionResponse]);

//   async function getAlbums() {
//     if (permissionResponse.status !== 'granted') {
//       const { status } = await requestPermission();
//       if (status !== 'granted') return;
//     }
//     const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
//       includeSmartAlbums: true,
//     });
//     setAlbums(fetchedAlbums);
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Button onPress={getAlbums} title="Get albums" />
//       <ScrollView>
//         {albums && albums.map((album) => (
//           <AlbumEntry key={album.id} album={album} />
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// function AlbumEntry({ album }) {
//   const [assets, setAssets] = useState([]);

//   useEffect(() => {
//     async function getAlbumAssets() {
//       const albumAssets = await MediaLibrary.getAssetsAsync({ album });
//       setAssets(albumAssets.assets);
//     }
//     getAlbumAssets();
//   }, [album]);

//   return (
//     <View style={styles.albumContainer}>
//       <Text>
//         {album.title} - {album.assetCount ?? 'no'} assets
//       </Text>
//       <View style={styles.albumAssetsContainer}>
//         {assets && assets.map((asset) => (
//           <AssetImage key={asset.id} asset={asset} />
//         ))}
//       </View>
//     </View>
//   );
// }

// function AssetImage({ asset }) {
//   const [uri, setUri] = useState(null);

//   useEffect(() => {
//     async function loadAssetUri() {
//       const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
//       setUri(assetInfo.localUri || assetInfo.uri);
//     }
//     loadAssetUri();
//   }, [asset]);

//   return uri ? (
//     <Image
//       source={{ uri }}
//       style={styles.assetImage}
//     />
//   ) : null;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 8,
//     justifyContent: 'center',
//     ...Platform.select({
//       android: {
//         paddingTop: 40,
//       },
//       ios: {
//         paddingTop: 20,
//       },
//     }),
//   },
//   albumContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 12,
//     gap: 4,
//   },
//   albumAssetsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   assetImage: {
//     width: 50,
//     height: 50,
//     margin: 2,
//   },
// });
