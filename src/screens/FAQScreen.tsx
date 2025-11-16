import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootDrawerParamList } from '../types';

type Props = DrawerScreenProps<RootDrawerParamList, 'FAQ'>;

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQScreen({ navigation }: Props) {
  const faqs: FAQ[] = [
    { 
      question: 'How do I add a review?', 
      answer: 'Navigate to your profile, go to the Reviews tab, and click "Add Review".' 
    },
    { 
      question: 'Can I edit my reviews?', 
      answer: 'Yes! Click the Edit button on any review to modify it.' 
    },
    { 
      question: 'How do I change my profile picture?', 
      answer: 'Go to your profile and click the camera icon on your picture.' 
    },
    { 
      question: 'Is my data secure?', 
      answer: 'Absolutely! We use industry-standard encryption to protect your information.' 
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View 
            key={index} 
            style={[
              styles.faqItem,
              index < faqs.length - 1 && styles.faqItemBorder
            ]}
          >
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
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
    marginBottom: 24,
    color: '#111827',
  },
  faqItem: {
    marginBottom: 24,
    paddingBottom: 24,
 },
    faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
},
    question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    },
    answer: {
    color: '#6b7280',
    lineHeight: 24,
    fontSize: 15,
    },
});