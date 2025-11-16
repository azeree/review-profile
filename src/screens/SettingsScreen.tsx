import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootDrawerParamList } from '../types';

type Props = DrawerScreenProps<RootDrawerParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <SettingItem label="Notifications" />
        <SettingItem label="Dark Mode" />
        <SettingItem label="Location Services" />
        <SettingItem label="Email Updates" />
      </View>
    </ScrollView>
  );
}

interface SettingItemProps {
  label: string;
}

function SettingItem({ label }: SettingItemProps) {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingLabel}>{label}</Text>
      <TouchableOpacity 
        onPress={() => setEnabled(!enabled)} 
        style={[
          styles.toggle,
          { backgroundColor: enabled ? '#dc2626' : '#d1d5db' }
        ]}
      >
        <View style={[
          styles.toggleCircle,
          { left: enabled ? 22 : 2 }
        ]} />
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    color: '#111827',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLabel: {
    fontSize: 15,
    color: '#111827',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    position: 'relative',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
  },
});