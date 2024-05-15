import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Modal, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native'; // Importa Dimensions do react-native
import { Camera } from 'expo-camera';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraOn, setIsCameraOn] = useState(false); // Estado para controlar se a câmera está ligada ou desligada
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn); // Alterna entre ligado e desligado
  };

  const takePicture = async () => {
    if (isCameraOn && cameraRef.current && cameraRef.current?.getCamera().isCameraReady) { // Verifica se a câmera está ligada
      let photo = await cameraRef.current.takePictureAsync();
      setSelectedImage(photo.uri);
      setModalVisible(true);
    } else {
      alert("A câmera está desligada. Pressione o botão para ligar.");
    }
  };

  const renderImages = () => {
    switch (activeSection) {
      case 'all':
      case 'photos':
        return (
          <>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/paisagem.png'))}>
                <Image source={require('./assets/paisagem.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/navio.png'))}>
                <Image source={require('./assets/navio.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/paisagem.png'))}>
                <Image source={require('./assets/paisagem.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/paisagem.png'))}>
                <Image source={require('./assets/paisagem.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/navio.png'))}>
                <Image source={require('./assets/navio.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedImage(require('./assets/paisagem.png'))}>
                <Image source={require('./assets/paisagem.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
          </>
        );
      case 'videos':
        return (
          <View>
            {/* No momento, não há vídeos para mostrar */}
            <Text style={styles.subText}>No videos available</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('./assets/perfil.png')} // Substitua 'perfil.png' pelo caminho da sua imagem
          style={styles.image}
        />
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
              source={require('./assets/perfil.png')} // Substitua 'perfil.png' pelo caminho da sua imagem
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
            <Image
              source={selectedImage}
              style={styles.modalImage}
            />
          </TouchableOpacity>
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

      <Text style={styles.mainText}>@fulanodetals</Text>
      <Text style={styles.subText}>
        {"Gosto de paçoca, de dar grau de moto e\n         buzina na frente do hospital"}
      </Text>
      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.blueButton, { marginRight: 20, marginLeft: 30 }]}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.whiteButton, { marginRight: 40, marginLeft: 30 }]}>
          <Text style={[styles.buttonText, styles.blueText]}>Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('all')}
        >
          <Text style={[styles.buttonText, styles.blueText, { textAlign: 'center', color: activeSection === 'all' ? 'blue' : 'black' }]}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('photos')}
        >
          <Text style={[styles.buttonText, styles.blueText, { textAlign: 'center', color: activeSection === 'photos' ? 'blue' : 'black' }]}>Photos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { marginRight: 10, marginLeft: 0 }]}
          onPress={() => setActiveSection('videos')}
        >
          <Text style={[styles.buttonText, styles.blueText, { textAlign: 'center', color: activeSection === 'videos' ? 'blue' : 'black' }]}>Videos</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll de imagens e vídeos */}
      <ScrollView style={styles.scrollContainer}>
        {renderImages()}
      </ScrollView>

      {/* Botão para ligar/desligar a câmera */}
      <TouchableOpacity onPress={toggleCamera} style={styles.cameraButton}>
        <Text style={styles.cameraButtonText}>{isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}</Text>
      </TouchableOpacity>

      {/* Botão para alternar entre câmera frontal e traseira */}
      {isCameraOn && (
        <TouchableOpacity onPress={handleCameraType} style={[styles.cameraButton, { backgroundColor: 'orange' }]}>
          <Text style={styles.cameraButtonText}>Switch Camera</Text>
        </TouchableOpacity>
      )}

      {isCameraOn && ( // Renderiza a câmera apenas se estiver ligada
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  column: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  smallButton: {
    width: 80,
    paddingVertical: 8,
    borderWidth: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  blueButton: {
    backgroundColor: 'blue',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
  },
  scrollContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  cameraButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    width: Dimensions.get('window').width, // Ocupa 100% da largura da tela
    height: Dimensions.get('window').height * 0.7, // Define a altura da câmera como 70% da altura da tela
    marginBottom: 20,
  },
});
