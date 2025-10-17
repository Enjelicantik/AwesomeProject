import React, { useState } from 'react';
import {
    View,
        Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/feather';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

const image = {
    uri: 'https://images.unsplash.com/photo-1664374128459-f4592389a14b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735',
};

const CommentCard = ({
    userName,
    comment,
}: {
    userName: string;
    comment: string;
}) => {
    if (typeof userName === 'string' && typeof comment === 'string') {
        return (
            <View style={styles.commentCard}>
                <View style={styles.commentHeader}>
                <View style={styles.commentAvatar}>
                    <FontAwesome name="user" size={12} color="rgba(0, 0, 0, 0.3)" />
                </View>
                <Text style={styles.commentUserName}>By {userName}</Text>
                </View>
                <Text style={styles.commentText}>{comment}</Text>
            </View>
        );
    }
};

const HotelCard = ({
  imageSource,
  hotelName,
  location,
  ratings,
  price,
}: {
  imageSource: string;
  hotelName: string;
  location: string;
  ratings: number;
  price: number;
}) => {
  return (
    <View style={styles.hotelCard}>
      <ImageBackground
        source={{ uri: imageSource }}
        style={styles.hotelImage}
      />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{hotelName}</Text>
        <View style={styles.hotelLocationContainer}>
          <FontAwesome name="map-pin" size={24} color="white" />
          <Text style={styles.hotelLocation}>{location}</Text>
        </View>
        <View style={styles.hotelRatings}>
          <FontAwesome name="star" size={12} color="#fff" />
          <Text style={styles.hotelRatingText}>{ratings.toFixed(1)}</Text>
        </View>
        <Text style={styles.hotelPrice}>
          ${price.toLocaleString()}{' '}
          <Text style={styles.hotelPricePerNight}>/ night</Text>
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  const totalAmount = count * 10000;

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.overlayDark} />
        <View style={styles.content}>
          {/* ratings */}
          <View style={styles.ratings}>
            <FontAwesome name="star" size={18} color="#fff" />
            <Text style={styles.RatingText}>5.0</Text>
          </View>
          <Text style={styles.title}>Labuan Bajo</Text>
          <Text style={styles.description}>
            From crystal-clear waters to breathtaking sunsets, Labuan Bajo is
            calling! Explore hidden islands, swim with manta rays, and create
            memories that last a lifetime
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.topFrame}>
        <TouchableOpacity style={styles.backButton}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.weather}>
          <FontAwesome name="sun" size={22} color="#fff" />
          <Text style={styles.weatherText}>24° C</Text>
        </View>
      </View>
      <View style={styles.detailTitle}>
        <View style={styles.country}>
          <ImageBackground
            source={require('./img/flag.png')}
            style={styles.flag}
          />
          <Text style={styles.flagText}>Indonesia</Text>
        </View>
        <Text style={styles.detailTitleText}>
          Discover the Beauty of Labuan Bajo
        </Text>
      </View>
      <View style={styles.commentSection}>
        <CommentCard
          userName="Rifqi starboy"
          comment="Wow amazing yahh, best experience in my life very very worth it i like it! Very good very well"
        />
        <CommentCard
          userName="Jane Doe"
          comment="An unforgettable experience! The crystal-clear waters and vibrant marine life made snorkeling a true adventure. The local culture and cuisine added depth to our trip, creating lasting memories. Highly recommend Labuan Bajo for nature lovers and adventure seekers!"
        />
      </View>
      <LinearGradient
        colors={['transparent', '#f3f2e7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={styles.gradient}
      />
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View All</Text>
      </TouchableOpacity>
      <View style={styles.hotelSection}>
        <Text style={styles.hotelSectionTitle}>Recommendation in Bajo</Text>
        <HotelCard
          imageSource="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
          hotelName="Phinisi Luxury Private Trip"
          location="Complimentary pick-up from Labuan Bajo Airport or surrounding hotels"
          ratings={4.8}
          price={3000}
        />
        <HotelCard
          imageSource="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
          hotelName="Bajo Komodo Eco Lodge"
          location="Jl. Pantai Pede, Labuan Bajo, Flores, NTT, Indonesia"
          ratings={4.5}
          price={1500}
        />
      </View>
      <View style={styles.booking}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.countSection}>
          <View style={styles.countSectionRow}>
            <TouchableOpacity
              style={styles.countButtonPlus}
              onPress={incrementCount}
            >
              <FontAwesome name="plus" size={16} color="white" />
            </TouchableOpacity>
            <Text style={styles.countText}>{count}</Text>
            <TouchableOpacity
              style={styles.countButtonMinus}
              onPress={decrementCount}
            >
              <FontAwesome name="minus" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.amountSection}>
            <Text style={styles.amountText}>Total Amount</Text>
            <Text style={styles.amountDollar}>
              ${totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() => {
            // Handle booking action
          }}
        >
          <Text style={styles.bookingButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingButtonText: { color: '#fff', fontSize: 16 },
  bookingButton: {
    backgroundColor: '#ff7043',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountDollar: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  amountText: {
    fontSize: 14,
    color: 'white',
  },
  amountSection: { alignItems: 'flex-end' },
  countButtonMinus: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 67,
    backgroundColor: '#fff',
  },
  countText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginHorizontal: 15,
  },
  countSectionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  countButtonPlus: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 67,
    backgroundColor: '#ff7043',
  },
  countSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  booking: {
    backgroundColor: '#5786cc76',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 190,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    overflow: 'hidden',
  },
  hotelSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.9)',
  },
  hotelSection: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
  },
  viewAllButtonText: { color: '#43433D', fontWeight: '500' },
  viewAllButton: {
    backgroundColor: '#EAE9D2',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 18.5,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 255,
    alignSelf: 'center',
    marginBottom: 40,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 500,
  },
  commentSection: { paddingLeft: 25, paddingRight: 25 },
  flagText: { color: 'rgba(0, 0, 0, 0.7)', fontSize: 12 },
  RatingText: { color: '#fff', fontSize: 18, fontWeight: '500' },
  hotelPricePerNight: { color: '#fff', fontSize: 14, fontWeight: '300' },
  hotelRatingText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  hotelLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentText: { fontSize: 12, fontWeight: '300' },
  commentUserName: { fontSize: 12, fontWeight: '500', fontStyle: 'italic' },
  commentAvatar: {
    height: 20,
    width: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  hotelCard: {
    backgroundColor: '#131e2e',
    borderRadius: 24,
    overflow: 'hidden',
    padding: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  hotelImage: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
    height: 130,
    width: 148,
  },
  hotelInfo: {
    flex: 1,
    justifyContent: 'space-between',
    height: 130,
    paddingVertical: 8,
  },
  hotelName: {
    color: '#fff',
    fontSize: 16,
  },
  hotelPrice: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  hotelLocation: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
    width: 140,
  },
  hotelRatings: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f2e7',
  },
  topFrame: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
  },
  weather: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 8,
    padding: 12,
    height: 48,
    width: 126,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 24,
  },
  weatherText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  backButton: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    padding: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  overlayDark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  image: {
    height: 370,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratings: {
    backgroundColor: 'rgba(143, 143, 143, 0.5)',
    width: 67,
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 25,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '500',
    marginBottom: 10,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
  },
  detailTitle: {
    marginTop: 40,
    marginBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    gap: 10,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    overflow: 'hidden',
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 6,
  },
  detailTitleText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.9)',
  },
});

export default App;
