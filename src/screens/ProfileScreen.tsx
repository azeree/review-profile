import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ReviewsList from '../components/ReviewsList';
import { initialAppReviews, initialFoodReviews, initialUserData } from '../data/DataStore';
import { FoodReview, Review, RootDrawerParamList, UserData } from '../types';

type Props = DrawerScreenProps<RootDrawerParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [appReviews, setAppReviews] = useState<Review[]>(initialAppReviews);
  const [foodReviews, setFoodReviews] = useState<FoodReview[]>(initialFoodReviews);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>({ ...initialUserData });
  const [activeTab, setActiveTab] = useState<'app' | 'food'>('app');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('userData');
      const savedAppReviews = await AsyncStorage.getItem('appReviews');
      const savedFoodReviews = await AsyncStorage.getItem('foodReviews');
      
      if (savedUser) setUserData(JSON.parse(savedUser));
      if (savedAppReviews) setAppReviews(JSON.parse(savedAppReviews));
      if (savedFoodReviews) setFoodReviews(JSON.parse(savedFoodReviews));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(editData));
      setUserData(editData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const saveReviews = async (type: string, reviews: Review[] | FoodReview[]) => {
    try {
      await AsyncStorage.setItem(type, JSON.stringify(reviews));
    } catch (error) {
      console.error('Error saving reviews:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.cameraButton}>
                <Feather name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          
          {!isEditing ? (
            <>
              <Text style={styles.name}>{userData.name}</Text>
              <Text style={styles.username}>{userData.username}</Text>
            </>
          ) : (
            <>
              <TextInput
                value={editData.name}
                onChangeText={(text) => setEditData({...editData, name: text})}
                style={styles.editInput}
              />
              <TextInput
                value={editData.username}
                onChangeText={(text) => setEditData({...editData, username: text})}
                style={[styles.editInput, { fontSize: 14 }]}
              />
            </>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <InfoRow 
            label="Email" 
            value={userData.email} 
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            field="email"
          />
          <InfoRow 
            label="Date of Birth" 
            value={userData.dateOfBirth} 
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
            field="dateOfBirth"
          />
        </View>

        <TouchableOpacity 
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          style={[styles.button, { backgroundColor: isEditing ? '#16a34a' : '#dc2626' }]}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Edit Profile'}</Text>
        </TouchableOpacity>

        {isEditing && (
          <TouchableOpacity 
            onPress={() => { setIsEditing(false); setEditData({...userData}); }}
            style={[styles.button, { backgroundColor: '#6b7280', marginTop: 10 }]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Reviews Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My Reviews</Text>
        
        <View style={styles.tabs}>
          <TouchableOpacity 
            onPress={() => setActiveTab('app')}
            style={[styles.tab, activeTab === 'app' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'app' && styles.activeTabText]}>
              App Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('food')}
            style={[styles.tab, activeTab === 'food' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'food' && styles.activeTabText]}>
              Food Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'app' ? (
          <ReviewsList 
            reviews={appReviews} 
            setReviews={(reviews) => {
              setAppReviews(reviews as Review[]);
              saveReviews('appReviews', reviews);
            }} 
            type="app" 
          />
        ) : (
          <ReviewsList 
            reviews={foodReviews} 
            setReviews={(reviews) => {
              setFoodReviews(reviews as FoodReview[]);
              saveReviews('foodReviews', reviews);
            }} 
            type="food" 
          />
        )}
      </View>
    </ScrollView>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  isEditing: boolean;
  editData: UserData;
  setEditData: (data: UserData) => void;
  field: keyof UserData;
}

function InfoRow({ label, value, isEditing, editData, setEditData, field }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          value={String(editData[field])}
          onChangeText={(text) => setEditData({...editData, [field]: text})}
          style={styles.input}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#dc2626',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#dc2626',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  username: {
    marginTop: 4,
    fontSize: 15,
    color: '#6b7280',
  },
  editInput: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 6,
  },
  value: {
    fontSize: 15,
    color: '#111827',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    fontSize: 15,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#dc2626',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#dc2626',
    fontWeight: '600',
  },
}); 