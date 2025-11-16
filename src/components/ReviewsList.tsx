import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FoodReview, Review } from '../types';

interface ReviewsListProps {
  reviews: Review[] | FoodReview[];
  setReviews: (reviews: Review[] | FoodReview[]) => void;
  type: 'app' | 'food';
}

export default function ReviewsList({ reviews, setReviews, type }: ReviewsListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<FoodReview>>({ 
    foodName: '', 
    rating: 5, 
    comment: '', 
    date: new Date().toISOString().split('T')[0] 
  });

  const handleAdd = () => {
    if (!formData.comment?.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }
    if (type === 'food' && !formData.foodName?.trim()) {
      Alert.alert('Error', 'Please enter a food name');
      return;
    }

    const newReview = { 
      ...formData, 
      id: Date.now(),
      rating: formData.rating || 5,
      comment: formData.comment || '',
      date: formData.date || new Date().toISOString().split('T')[0]
    } as Review | FoodReview;
    
    setReviews([newReview, ...reviews]);
    setFormData({ foodName: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0] });
    setIsAdding(false);
  };

  const handleUpdate = (id: number) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, ...formData } as Review | FoodReview : r));
    setEditingId(null);
    setFormData({ foodName: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setReviews(reviews.filter(r => r.id !== id)), style: 'destructive' }
      ]
    );
  };

  const startEdit = (review: Review | FoodReview) => {
    setEditingId(review.id);
    setFormData(review);
  };

  const isFoodReview = (review: Review | FoodReview): review is FoodReview => {
    return 'foodName' in review;
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsAdding(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Review</Text>
      </TouchableOpacity>

      {(isAdding || editingId) && (
        <View style={styles.form}>
          {type === 'food' && (
            <TextInput
              placeholder="Food name"
              value={formData.foodName}
              onChangeText={(text) => setFormData({...formData, foodName: text})}
              style={styles.input}
            />
          )}
          
          <View style={styles.ratingContainer}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.stars}>
              {[1,2,3,4,5].map(n => (
                <TouchableOpacity key={n} onPress={() => setFormData({...formData, rating: n})}>
                  <FontAwesome name="star" size={32} color={n <= (formData.rating || 0) ? '#fbbf24' : '#d1d5db'} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            placeholder="Your review..."
            value={formData.comment}
            onChangeText={(text) => setFormData({...formData, comment: text})}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity 
              onPress={() => editingId ? handleUpdate(editingId) : handleAdd()}
              style={[styles.formButton, { backgroundColor: '#16a34a' }]}
            >
              <Text style={styles.formButtonText}>{editingId ? 'Update' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { 
                setIsAdding(false); 
                setEditingId(null); 
                setFormData({ foodName: '', rating: 5, comment: '', date: new Date().toISOString().split('T')[0] });
              }}
              style={[styles.formButton, { backgroundColor: '#6b7280' }]}
            >
              <Text style={styles.formButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {reviews.map(review => (
        <View key={review.id} style={styles.reviewCard}>
          {type === 'food' && isFoodReview(review) && (
            <Text style={styles.foodName}>{review.foodName}</Text>
          )}
          
          <View style={styles.reviewHeader}>
            <View style={styles.starsDisplay}>
              {[...Array(5)].map((_, i) => (
                <FontAwesome 
                  key={i} 
                  name="star" 
                  size={16} 
                  color={i < review.rating ? '#fbbf24' : '#d1d5db'} 
                />
              ))}
            </View>
            <Text style={styles.date}>{review.date}</Text>
          </View>

          <Text style={styles.comment}>{review.comment}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => startEdit(review)} style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(review.id)} style={[styles.actionButton, { backgroundColor: '#ef4444' }]}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {reviews.length === 0 && !isAdding && (
        <Text style={styles.emptyText}>No reviews yet. Add your first review!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  formButton: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  formButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  reviewCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsDisplay: {
    flexDirection: 'row',
    gap: 4,
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
  },
  comment: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
    padding: 32,
  },
});