import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const renderImages = () => {
    switch (activeSection) {
      case 'all':
      case 'photos':
        return (
          <>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedImage(require('./assets/navio.png'))}>
                <Image
                  source={require('./assets/navio.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedImage(require('./assets/navio.png'))}>
                <Image
                  source={require('./assets/navio.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedImage(require('./assets/navio.png'))}>
                <Image
                  source={require('./assets/navio.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setSelectedImage(require('./assets/paisagem.png'))
                }>
                <Image
                  source={require('./assets/paisagem.png')}
                  style={styles.image}
                />
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
        onRequestClose={() => setModalVisible(false)}>
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
        onRequestClose={() => setSelectedImage(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Image source={selectedImage} style={styles.modalImage} />
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
        {
          'Gosto de paçoca, de dar grau de moto e\n         buzina na frente do hospital'
        }
      </Text>
      {/* Botões */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.blueButton,
            {marginRight: 20, marginLeft: 30},
          ]}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.whiteButton,
            {marginRight: 40, marginLeft: 30},
          ]}>
          <Text style={[styles.buttonText, styles.blueText]}>Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.smallButton, {marginRight: 10, marginLeft: 0}]}
          onPress={() => setActiveSection('all')}>
          <Text
            style={[
              styles.buttonText,
              styles.blueText,
              {
                textAlign: 'center',
                color: activeSection === 'all' ? 'blue' : 'black',
              },
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, {marginRight: 10, marginLeft: 0}]}
          onPress={() => setActiveSection('photos')}>
          <Text
            style={[
              styles.buttonText,
              styles.blueText,
              {
                textAlign: 'center',
                color: activeSection === 'photos' ? 'blue' : 'black',
              },
            ]}>
            Photos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, {marginRight: 10, marginLeft: 0}]}
          onPress={() => setActiveSection('videos')}>
          <Text
            style={[
              styles.buttonText,
              styles.blueText,
              {
                textAlign: 'center',
                color: activeSection === 'videos' ? 'blue' : 'black',
              },
            ]}>
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scroll de imagens e vídeos */}
      <ScrollView style={styles.scrollContainer}>{renderImages()}</ScrollView>
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
  video: {
    width: 300,
    height: 200,
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
    marginBottom: 10, // Adiciona um espaçamento inferior
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
    marginBottom: 10, // Adiciona um espaçamento inferior
  },
  button: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10, // Adiciona um espaçamento inferior
  },
  smallButton: {
    width: 80, // Tamanho menor para os novos botões
    paddingVertical: 8, // Ajuste para o tamanho menor
    borderWidth: 0,
  },
  buttonRow: {
    flexDirection: 'row', // Botões dispostos em linha
    justifyContent: 'center', // Centraliza os botões horizontalmente
    width: '100%',
    marginBottom: 10, // Adiciona um espaçamento inferior
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
    marginTop: 10, // Espaçamento superior
    paddingHorizontal: 20, // Padding horizontal para evitar margens laterais
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espaçamento entre as linhas
  },
});
