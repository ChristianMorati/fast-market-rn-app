import React, { useContext } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUserProvider';
import { Title } from '../../styled-components/text';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useDeviceTheme from '../../theme/use-theme';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const { user } = useContext(AuthenticatedUserContext); // Assumindo que o contexto fornece informações sobre o usuário, incluindo o nome e a foto
  const { theme } = useDeviceTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.photo_url }} style={styles.photo} />
      <View style={styles.textArea}>
        <Title style={styles.greeting}>Olá, {user.name}</Title>
        <Pressable onPress={() => {
          navigation.navigate('Comprar')
        }}>
          <FontAwesome styles={styles.camButton} name="camera" size={24} color={theme.color} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;