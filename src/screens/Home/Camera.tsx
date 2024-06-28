import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase'; // Ajuste o caminho conforme necessário

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

  const convertUriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = async (blob: Blob, fileName: string) => {
    const { data, error } = await supabase.storage
      .from('posts')
      .upload(fileName, blob, { contentType: 'image/jpeg' });

    if (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }

    const { data: urlData, error: urlError } = supabase
      .storage
      .from('posts')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('Erro ao obter URL pública:', urlError);
      throw urlError;
    }

    return urlData.publicUrl;
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo URI:', photo.uri);

      const blob = await convertUriToBlob(photo.uri);
      const fileName = photo.uri.split('/').pop();
      const imageUrl = await uploadImage(blob, fileName!);
      console.log('Image uploaded to Supabase:', imageUrl);

      let photos = await AsyncStorage.getItem('photos');
      photos = photos ? JSON.parse(photos) : [];

      if (Array.isArray(photos)) {
        photos.push(imageUrl);
      } else {
        photos = imageUrl ? [imageUrl] : [];
      }

      await AsyncStorage.setItem('photos', JSON.stringify(photos));
      console.log('Photo URL saved in AsyncStorage');

      const { data, error } = await supabase
        .from('posts')
        .insert([{ image_url: imageUrl }]);

      if (error) {
        console.error('Erro ao salvar URL no banco de dados:', error);
        throw error;
      }

      console.log('Image URL saved in Supabase database');
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Erro ao tirar foto e enviar ao Supabase.');
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
      <Camera
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
      </Camera>
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
