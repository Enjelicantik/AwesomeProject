import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface Destination {
  id: string;
  imageURL: string;
  country: string;
  name: string;
  description: string;
  temperature: number;
  rating: number;
  countryFlag: string;
  price: number;
}

const DestinationCard = ({
  image,
  location,
  name,
  price,
  rating,
  favorite = false,
  description,
  temperature,
  flagImage,
  onToggleFavorite,
}: {
  image: any;
  location: string;
  name: string;
  price: string;
  rating: string;
  favorite: boolean;
  description?: string;
  temperature?: string;
  flagImage?: any;
  onToggleFavorite?: () => void;
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DetailPage', {
      image,
      location,
      name,
      price,
      rating,
      description,
      temperature,
      flagImage,
    });
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={image} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View>
            <View style={styles.locationRow}>
              <AwesomeIcon name="map-marker" size={12} color="#fff" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <Text style={styles.destinationName}>{name}</Text>
          </View>
          <View style={styles.priceRating}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={12} color="#FFf" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={handleFavoritePress}
      >
        {favorite ? (
          <AwesomeIcon name="heart" size={20} color="#FF6B4E" />
        ) : (
          <Icon name="heart" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://68fafef094ec960660243e4d.mockapi.io/api/destination',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDestinations();
    setRefreshing(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const favoriteCount = favorites.size;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF6B4E']}
            tintColor="#FF6B4E"
            title="Pull to refresh"
            titleColor="#999"
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi,</Text>
            <Text style={styles.userName}>Enjeli</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <AwesomeIcon name="heart" size={32} color="#FF6B4E" />
            <Text style={styles.notificationBadge}>{favoriteCount}</Text>
          </TouchableOpacity>
        </View>

        {/* Summer Banner */}
        <TouchableOpacity style={styles.banner}>
          <LinearGradient
            colors={['#FF7B5F', '#FF6B4E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>Plan Your</Text>
              <Text style={styles.bannerText}>Summer!</Text>
            </View>
            <View style={styles.bannerIconContainer}>
              <Icon name="arrow-right" size={24} color="#fff" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search destination..."
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Popular Destination Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destination</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Destination Cards */}
        <View style={styles.cardsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6B4E" />
              <Text style={styles.loadingText}>Loading destinations...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={48} color="#FF6B4E" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchDestinations}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : destinations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="map" size={48} color="#999" />
              <Text style={styles.emptyText}>No destinations found</Text>
            </View>
          ) : (
            destinations.map(destination => (
              <DestinationCard
                key={destination.id}
                image={{ uri: destination.imageURL }}
                location={destination.country}
                name={destination.name}
                price={`$${destination.price.toLocaleString()}/pax`}
                rating={destination.rating.toString()}
                favorite={favorites.has(destination.id)}
                description={destination.description}
                temperature={`${destination.temperature}° C`}
                flagImage={{ uri: destination.countryFlag }}
                onToggleFavorite={() => toggleFavorite(destination.id)}
              />
            ))
          )}
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
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 14,
    color: '#999',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    bottom: 10,
    right: 8,
    height: 16,
    width: 16,
    borderRadius: 100,
    backgroundColor: '#333',
    paddingVertical: 2,
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bannerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  bannerContent: {
    flex: 1,
  },
  bannerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 38,
  },
  bannerIconContainer: {
    width: 50,
    height: 109,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 25,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#1B3A57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 14,
    color: '#999',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  priceRating: {
    alignSelf: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: '#FF6B4E',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF6B4E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
});

export default Home;
