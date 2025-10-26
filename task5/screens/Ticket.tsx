import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const TicketCard = ({
  from,
  fromCode,
  to,
  toCode,
  departureTime,
  departureDate,
  arrivalTime,
  arrivalDate,
  price,
}: {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  price: string;
}) => {
  return (
    <View style={styles.ticketCard}>
      {/* Left Side - Gradient with AIR LINES */}
      <LinearGradient colors={['#FF7B5F', '#FF6B4E']} style={styles.ticketLeft}>
        <Text style={styles.airLinesText}>AIR LINES</Text>
        <View style={styles.planeIconCircle}>
          <Image
            source={require('../../img/icon/plane-right.png')}
            style={styles.planeIcon}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      {/* Middle - Flight Details */}
      <View style={styles.ticketMiddle}>
        <View style={styles.flightRow}>
          <View style={styles.airportInfo}>
            <Text style={styles.airportCode}>{fromCode}</Text>
            <Text style={styles.cityName}>{from}</Text>
          </View>

          <View style={styles.planeIconContainer}>
            <Image
              source={require('../../img/icon/plane.png')}
              style={styles.planeIconMiddle}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.airportInfo, styles.airportInfoRight]}>
            <Text style={styles.airportCode}>{toCode}</Text>
            <Text style={styles.cityName}>{to}</Text>
          </View>
        </View>

        <View style={styles.timeRow}>
          <View>
            <Text style={styles.timeText}>{departureTime}</Text>
            <Text style={styles.dateText2}>{departureDate}</Text>
          </View>
          <View style={[styles.airportInfo, styles.airportInfoRight]}>
            <Text style={styles.timeText}>{arrivalTime}</Text>
            <Text style={styles.dateText2}>{arrivalDate}</Text>
          </View>
        </View>

        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  );
};

const Ticket = () => {
  const [selectedLocation, _setSelectedLocation] = useState('Netherlands');
  const [selectedCategory, setSelectedCategory] = useState('Aircraft');
  const [selectedMonth, _setSelectedMonth] = useState('June, 2025');
  const [selectedDate, setSelectedDate] = useState(23);

  const categories = ['Hotel', 'Aircraft', 'Villa', 'Attraction'];
  const dates = [
    { day: 'S', date: 22 },
    { day: 'M', date: 23 },
    { day: 'T', date: 24 },
    { day: 'W', date: 25 },
    { day: 'T', date: 26 },
    { day: 'F', date: 27 },
    { day: 'S', date: 28 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tickets</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Location */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Current Locations</Text>
          <TouchableOpacity style={styles.locationSelector}>
            <Text style={styles.locationText}>{selectedLocation}</Text>
            <Icon name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Month Selector */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.monthSelector}>
            <Text style={styles.monthText2}>{selectedMonth}</Text>
            <Icon name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          {dates.map(item => (
            <TouchableOpacity
              key={item.date}
              style={[
                styles.dateButton,
                selectedDate === item.date && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate === item.date && styles.dayTextActive,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  selectedDate === item.date && styles.dateNumberActive,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tickets Found */}
        <View style={styles.ticketsFoundContainer}>
          <Text style={styles.ticketsFoundText}>4 Tickets Found</Text>
        </View>

        {/* Ticket Cards */}
        <View style={styles.ticketsContainer}>
          <TicketCard
            from="Rotterdam"
            fromCode="NL"
            to="Labuan Bajo"
            toCode="IDN"
            departureTime="5:30pm"
            departureDate="Mon, 23 Jun"
            arrivalTime="3:30am"
            arrivalDate="Tue, 24 Jun"
            price="$1.700"
          />
          <TicketCard
            from="Rotterdam"
            fromCode="NL"
            to="Labuan Bajo"
            toCode="IDN"
            departureTime="5:30pm"
            departureDate="Mon, 23 Jun"
            arrivalTime="3:30am"
            arrivalDate="Tue, 24 Jun"
            price="$1.700"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B4E',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
    minWidth: 40,
  },
  dateButtonActive: {
    backgroundColor: '#FF6B4E',
  },
  dayText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  dayTextActive: {
    color: '#fff',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateNumberActive: {
    color: '#fff',
  },
  ticketsFoundContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  ticketsFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  ticketCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    height: 180,
  },
  ticketLeft: {
    width: 60,
    paddingVertical: 20,
    paddingHorizontal: 16,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  airLinesText: {
    fontSize: 14,
    color: '#fff',
    letterSpacing: 0,
    transform: [{ rotate: '-90deg' }],
    width: 120,
    textAlign: 'center',
    position: 'absolute',
    top: 60,
  },
  planeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 24,
    backgroundColor: '#1B3A57',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  planeIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  ticketMiddle: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  airportInfo: {
    flex: 1,
  },
  airportInfoRight: {
    alignItems: 'flex-end',
  },
  airportCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1B3A57',
    marginBottom: 4,
  },
  cityName: {
    fontSize: 13,
    color: '#999',
    fontWeight: '400',
  },
  planeIconContainer: {
    marginHorizontal: 20,
  },
  planeIconMiddle: {
    width: 32,
    height: 32,
    tintColor: '#333',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A57',
    marginBottom: 2,
  },
  dateText2: {
    fontSize: 13,
    color: '#999',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A57',
  },
});

export default Ticket;
