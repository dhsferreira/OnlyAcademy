import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
  
    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo URI:', photo.uri);
  
      // Recuperar a lista de fotos existente do AsyncStorage
      let photos = await AsyncStorage.getItem('photos');
      photos = photos ? JSON.parse(photos) : [];
  
      // Verifique se 'photos' é uma lista antes de adicionar a nova foto
      if (Array.isArray(photos)) {
        photos.push(photo.uri);
      } else {
        photos = photo.uri ? [photo.uri] : [];


      }
  
      // Armazenar a lista atualizada de fotos no AsyncStorage
      await AsyncStorage.setItem('photos', JSON.stringify(photos));
  
      console.log('Photo saved in AsyncStorage');
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  };
  
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        type={'back'}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        {isCameraReady && (
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.takePictureButton} onPress={takePicture}>
              <Ionicons name="camera" size={32} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraControls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  takePictureButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 20,
  },
});