// Toolbar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Toolbar = ({ onSelect }) => {
  return (
    <View style={styles.toolbarContainer}>
      <TouchableOpacity onPress={() => onSelect('Alarm')}>
        <Ionicons name="alarm" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Stopwatch')}>
        <Ionicons name="stopwatch" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect('Timer')}>
        <Ionicons name="timer" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,  // Adjusted width to accommodate icons
  },
  icon: {
    marginRight: 10,
  },
});

export default Toolbar;
