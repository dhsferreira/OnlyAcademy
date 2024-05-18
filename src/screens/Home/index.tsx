import React, { useState } from 'react';
import { View, Image, Modal, TouchableOpacity, Text, ScrollView } from 'react-native';
import { styles } from 'C:/Users/danie/Desktop/tela luiz separado/GitHub/OnlyAcademy/src/screens/Home/styles';

export default function home() {
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
        {/* Inserir a imagem para o botão de voltar */}
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('./assets/back.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

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
                source={selectedImage}
                style={styles.modalImage}
              />
            )}
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

      <Text style={styles.mainText}>@jhonMurf</Text>
      <Text style={styles.subText}>
        {"Gosto de paçoca, de dar grau de moto e\n          buzina na frente do hospital"}
      </Text>

      {/* Botões adicionados abaixo do terceiro texto */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.blueButton]}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.whiteButton]}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* Botões "All", "Photos" e "Videos" */}
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

      {/* Scroll de imagens e vídeos */}
      <ScrollView style={styles.scrollContainer}>
        {renderImages()}
      </ScrollView>
    </View>
  );
}
