import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootDrawerParamList } from '../types';

type Props = DrawerScreenProps<RootDrawerParamList, 'About'>;

export default function AboutScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>About Our App</Text>
        <Text style={styles.text}>
          Welcome to FoodReview, your ultimate companion for discovering and sharing amazing food experiences. 
          Our app connects food lovers worldwide, helping you find the best restaurants and dishes in your area.
        </Text>
        <Text style={styles.subtitle}>Features</Text>
        <Text style={styles.bulletPoint}>• Browse and review restaurants</Text>
        <Text style={styles.bulletPoint}>• Share photos of your favorite dishes</Text>
        <Text style={styles.bulletPoint}>• Connect with fellow food enthusiasts</Text>
        <Text style={styles.bulletPoint}>• Get personalized recommendations</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  text: {
    color: '#6b7280',
    lineHeight: 24,
    fontSize: 15,
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  bulletPoint: {
    color: '#6b7280',
    lineHeight: 28,
    fontSize: 15,
  },
});