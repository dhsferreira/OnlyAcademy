import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#E6EEFA',
    padding: 10,
    borderRadius: 50,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '50%', // Ajuste para cobrir apenas metade da tela
  },
  overlay: {
    position: 'absolute',
    top: '25%', // Comece a sobreposição do meio da tela
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E6EEFA',
    borderRadius: 50, // Cor da sobreposição
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  profileimage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    marginBottom: 25, // Aumente conforme necessário
    borderWidth: 5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10, // Aumente conforme necessário
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
    marginTop: -60,
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
    height: 40,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
    elevation: 5, // Adiciona sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2, // Adiciona um espaçamento inferior
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
    backgroundColor: '#5790DF',
    borderRadius: 30,
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  smallButtonText: {
    color: 'black',
  },
  blueText: {
    color: '#000000',
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
  bar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'black',
    marginTop: 5,
    alignSelf: 'center',
    width: 15,
  },
  cameraButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  cameraButton: {
    position: 'absolute',
    top: 35,
    right: 10,
    width: 65, // Defina a largura do botão conforme necessário
    height: 50, // Defina a altura do botão conforme necessário
    backgroundColor: 'white',
    borderRadius: 50, // Para um botão circular, use metade da largura/altura
    overflow: 'hidden', // Para garantir que a imagem não ultrapasse o botão
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Para garantir que a imagem preencha todo o botão
  },
  switchCameraButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  subscriptionButton: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
  },
  subscriptionModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subscriptionModalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subscriptionOption: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#5790DF',
  },
  subscriptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'black',
  },
  subscriptionButtonText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5, // Ajuste conforme necessário
  },
  
});
