import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Modal, TouchableOpacity, Text, ScrollView, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from './supabase'; // Importe o supabase corretamente
import { styles } from './styles';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<{ uri: string, blob?: Blob }[]>([]);
  const [subscriptionModalVisible, setSubscriptionModalVisible] = useState(false);
  const navigation = useNavigation();

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase.storage.from('images').list();
      if (error) {
        console.error('Erro ao buscar imagens do Supabase:', error.message);
        return;
      }

      const fetchedPhotos = await Promise.all(data.map(async (item: any) => {
        const response = await fetch(item.url); // Fetch da URL da imagem
        const blob = await response.blob(); // Converte a imagem para Blob
        return { uri: item.url, blob };
      }));

      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error('Erro ao buscar imagens do Supabase:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
    }, [])
  );

  const deletePhoto = async (photoUri: string) => {
    const updatedPhotos = photos.filter(photo => photo.uri !== photoUri);
    setPhotos(updatedPhotos);
    await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos.map(photo => photo.uri)));
  };

  const confirmDelete = (photoUri: string) => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deletePhoto(photoUri) }
      ]
    );
  };

  const handlePremiumPressmensal = () => {
    const url = 'https://mpago.la/1kvaeE6';
    Linking.openURL(url);
  };

  const handlePremiumPressanual = () => {
    const url = 'https://mpago.la/1MdGwXt';
    Linking.openURL(url);
  };

  const renderImages = () => {
    switch (activeSection) {
      case 'all':
      case 'photos':
        return (
          <View style={styles.imagesContainer}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(photo.uri)}
                onLongPress={() => confirmDelete(photo.uri)}
              >
                <Image source={{ uri: photo.uri }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'videos':
        return (
          <View>
            <Text style={styles.subText}>No videos available</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Componentes de UI restantes conforme o seu código anterior */}
      <View style={styles.backgroundContainer}>
        <Image
          source={require('./assets/fundo.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('./assets/perfil.png')}
          style={styles.profileimage}
        />
      </TouchableOpacity>

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('./assets/back.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Image
          source={require('./assets/camera.png')}
          style={styles.cameraIcon}
        />
        <Ionicons name="camera" size={32} color="black" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.subscriptionButton}
        onPress={() => setSubscriptionModalVisible(true)}
      >
        <Ionicons name="ios-card" size={32} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image
              source={require("./assets/perfil.png")}
              style={styles.modalImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedImage !== null}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
            )}
            
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={subscriptionModalVisible}
        onRequestClose={() => setSubscriptionModalVisible(false)}
      >
        <View style={styles.subscriptionModalContainer}>
          <View style={styles.subscriptionModalContent}>
            <Text style={styles.subscriptionTitle}>Escolha sua assinatura</Text>
            <TouchableOpacity 
              style={styles.subscriptionOption}
              onPress={handlePremiumPressmensal}
            >
              <Text style={styles.subscriptionText}>Premium Mensal - R$ 19,99</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.subscriptionOption}
              onPress={handlePremiumPressanual}
            >
              <Text style={styles.subscriptionText}>Premium Anual - R$ 199,99</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSubscriptionModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.textContainer}>
        <View style={styles.column}>
          <Text style={styles.mainText}>1k</Text>
          <Text style={styles.subText}>Followers</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.mainText}>365</Text>
          <Text style={styles.subText}>Following</Text>
        </View>
      </View>

      <Text style={styles.mainText}>@jhonMurf</Text>
      <Text style={styles.subText}>
        {"Gosto de paçoca, de dar grau de moto e\n          buzina na frente do hospital"}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.blueButton]}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('all')}
        >
          <Text style={[styles.smallButtonText, styles.blueText, { textAlign: 'center', color: activeSection === 'all' ? 'black' : 'black' }]}>All</Text>
          {activeSection === 'all' && <View style={styles.bar} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('photos')}
        >
          <Text style={[styles.smallButtonText, styles.blueText, { textAlign: 'center', color: activeSection === 'photos' ? 'black' : 'black' }]}>Photos</Text>
          {activeSection === 'photos' && <View style={styles.bar} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('videos')}
        >
          <Text style={[styles.smallButtonText, styles.blueText, { textAlign: 'center', color: activeSection === 'videos' ? 'black' : 'black' }]}>Videos</Text>
          {activeSection === 'videos' && <View style={styles.bar} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {renderImages()}
      </ScrollView>
    </View>
  );
}
