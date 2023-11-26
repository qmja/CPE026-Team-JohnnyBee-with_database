import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AlarmPage = ({ navigation, onLogout }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSettingsPressed, setIsSettingsPressed] = useState(false);
  const [isAnalyticsPressed, setIsAnalyticsPressed] = useState(false);
  const [isMenuIconPressed, setIsMenuIconPressed] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isAnalyticsModalVisible, setIsAnalyticsModalVisible] = useState(false);
  const [isAddAlarmModalVisible, setIsAddAlarmModalVisible] = useState(false);

  // State for managing alarm settings in the modal
  const [newAlarm, setNewAlarm] = useState({
    hour: 0,
    minutes: 0,
    isOn: false, // Add isOn property for the Switch
  });

  // State for managing the datetime picker modal
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

  // State for managing the alarms
  const [alarms, setAlarms] = useState([]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    setIsSettingsPressed(false);
    setIsAnalyticsPressed(false);
    setIsMenuIconPressed(!isMenuIconPressed);
  };

  const handleSettings = () => {
    toggleMenu();
    setIsSettingsModalVisible(true);
  };

  const handleAnalytics = () => {
    toggleMenu();
    setIsAnalyticsModalVisible(true);
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalVisible(false);
  };

  const handleAnalyticsModalClose = () => {
    setIsAnalyticsModalVisible(false);
  };

  // Function to open the datetime picker modal
  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  // Function to close the datetime picker modal
  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  // Function to handle date-time selection
  const handleDateTimePicked = (date) => {
    console.log('Date selected:', date);
    setNewAlarm({
      hour: date.getHours(),
      minutes: date.getMinutes(),
      isOn: false, // Set the default value for isOn
    });
    hideDateTimePicker();
  };

  // Function to open the Add Alarm modal
  const handleOpenAddAlarmModal = () => {
    // Open the datetime picker modal instead of directly showing the modal
    showDateTimePicker();
  };

  // Function to close the Add Alarm modal
  const handleCloseAddAlarmModal = () => {
    setIsAddAlarmModalVisible(false);
    // You can also reset the newAlarm state here if needed
  };

  // Function to handle saving the new alarm
  const handleSaveAlarm = () => {
    // Implement logic to save the new alarm
    console.log('New Alarm:', newAlarm);
    setAlarms([...alarms, newAlarm]); // Add the new alarm to the alarms state
    // Close the modal
    handleCloseAddAlarmModal();
  };

  // Function to toggle the Switch for existing alarms
  const toggleAlarmSwitch = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].isOn = !updatedAlarms[index].isOn;
    setAlarms(updatedAlarms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarm Page</Text>
      <Ionicons
        name="menu"
        size={30}
        color={isMenuIconPressed ? 'blue' : 'black'}
        style={styles.menuIcon}
        onPress={toggleMenu}
      />

      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <View
            style={[
              styles.menuItemContainer,
              { backgroundColor: isSettingsPressed ? 'lightgray' : '#FFF8D6' },
            ]}
          >
            <TouchableHighlight
              onPress={handleSettings}
              onPressIn={() => setIsSettingsPressed(true)}
              onPressOut={() => setIsSettingsPressed(false)}
              underlayColor="transparent"
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableHighlight>
          </View>
          <View
            style={[
              styles.menuItemContainer,
              { backgroundColor: isAnalyticsPressed ? 'lightgray' : '#FFF8D6' },
            ]}
          >
            <TouchableHighlight
              onPress={handleAnalytics}
              onPressIn={() => setIsAnalyticsPressed(true)}
              onPressOut={() => setIsAnalyticsPressed(false)}
              underlayColor="transparent"
            >
              <Text style={styles.menuItemText}>Analytics</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}

      <Modal visible={isSettingsModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Settings Modal</Text>
          <Button title="Logout" onPress={() => { onLogout(); handleSettingsModalClose(); }} />
          <Button title="Close" onPress={handleSettingsModalClose} />
        </View>
      </Modal>

      <Modal visible={isAnalyticsModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Analytics Modal</Text>
          <Button title="Close" onPress={handleAnalyticsModalClose} />
        </View>
      </Modal>

      {/* Include Alarm component */}
      <ScrollView style={styles.alarmsContainer}>
        {alarms.map((alarm, index) => (
          <View key={index} style={styles.alarmItem}>
            <Text style={styles.alarmTime}>
              {alarm.hour.toString().padStart(2, '0')}:{alarm.minutes.toString().padStart(2, '0')}
            </Text>
            <Switch
              value={alarm.isOn}
              onValueChange={() => toggleAlarmSwitch(index)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pressable for adding an alarm */}
      <Pressable style={styles.addAlarmContainer} onPress={handleOpenAddAlarmModal}>
        <Ionicons name="add" style={styles.addIcon} />
      </Pressable>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="time"
        onConfirm={handleDateTimePicked}
        onCancel={hideDateTimePicker}
      />

      {/* Add Alarm Modal */}
      <Modal visible={isAddAlarmModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set Alarm</Text>
          {/* Display the selected time in the modal */}
          <Text style={styles.selectedTimeText}>
            {newAlarm.hour.toString().padStart(2, '0')}:{newAlarm.minutes.toString().padStart(2, '0')}
          </Text>
          <Button title="Pick Time" onPress={handleOpenAddAlarmModal} />
          <Button title="Save" onPress={handleSaveAlarm} />
          <Button title="Close" onPress={handleCloseAddAlarmModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#485613',
    padding: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    marginTop: 15,
    marginRight: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 'auto',
    right: 'auto',
    backgroundColor: '#FFF8D6', // Change this color
    width: 80,
    alignItems: 'center',
    marginLeft: 230,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItemContainer: {
    marginVertical: 5,
    alignItems: 'center',
    width: 80,
  },
  menuItemText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alarmsContainer: {
    backgroundColor: '#788F25',
    maxHeight: 400,
    borderRadius: 20,
    marginBottom: 20,
    width: 310, // Take up full width
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#b07c3b',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  alarmTime: {
    fontSize: 24,
    color: 'white',
  },
  addAlarmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#b07c3b',
  },
  addIcon: {
    fontSize: 30,
    color: 'black',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  selectedTimeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

export default AlarmPage;
