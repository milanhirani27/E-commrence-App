import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import FilterModal from '../../components/FilterModal';
import { DataContext } from '../../contexts/DataContext';
import { CartContext } from '../../contexts/CartContext';
import styles from './styles';

const ProductListingScreen = () => {
  const { productData, isLoading, fetchData } = useContext(DataContext);
  const { flattenArray, addToCart, removeFromCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortedProducts, setSortedProducts] = useState('');

  useEffect(() => {
    fetchData()
  }, [productData])

  const handleSearch = (query) => {
    setSearchQuery(query);
    const arrayToFilter = filteredProducts.length === 0 ? productData : filteredProducts;
    const filtered = arrayToFilter.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilterValue = (data) => {
    setSortedProducts(data)
  }

  const applyFilter = (filter) => {
    setSortedProducts(filter);
    let sortedProducts = [...productData];
    switch (filter) {
      case 'ascending':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'descending':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'lowestToHighest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'highestToLowest':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts)
    closeModal();
  };

  const closeModal = () => {
    setFilterModalVisible(false);
  };

  const highlightSearchQuery = (input, searchQuery) => {
    if (!input || !searchQuery) return input;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = input.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchQuery.toLowerCase()) {
        return (
          <Text key={index} style={{ fontWeight: 'bold' }}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  const skeletonData = [1, 1, 1, 1, 1, 1, 1,]

  const renderFlatListData = ({ item }) => {
    const foundProduct = flattenArray.find((product) => product.id === item.id);

    return (
      <View style={styles.flatlistContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode={'contain'} />
        <Text numberOfLines={1} style={styles.title}>
          {searchQuery ? highlightSearchQuery(item.title, searchQuery) : item.title}
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.price}>{'₹ ' + item.price}</Text>
          {foundProduct ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => addToCart(item)} style={{ top: -2 }}>
                <Text style={styles.textContent}>+</Text>
              </TouchableOpacity>
              <Text style={styles.displayText}>
                {foundProduct.data.length}
              </Text>
              <TouchableOpacity onPress={() => removeFromCart(item)} style={{ top: -2 }}>
                <Text style={styles.textContent}>-</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButtonContainer}>
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header cartItem={flattenArray} />
      <View style={styles.headerContainer}>
        <SearchInput inputValue={searchQuery} onChange={handleSearch} isVisible={searchQuery ? true : false} onClose={() => setSearchQuery('')} handleFilter={handleFilterValue} />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={[styles.filterButton, { backgroundColor: sortedProducts ? '#FFF2E7' : 'white', padding: sortedProducts ? 16 : 0, borderRadius: sortedProducts ? 16 : 0 }]}>
          <Image source={sortedProducts ? require('../../assets/Filter2.png') : require('../../assets/Filter.png')} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
        {isLoading ? <FlatList
          data={skeletonData}
          numColumns={2}
          renderItem={() => {
            return (
              <View style={styles.skeletonItemContainer}>
                <View style={styles.skeletonItemImageContainer} />
                <View style={styles.skeletonItemTextContainer}>
                  <View style={styles.skeletonItemText} />
                  <View style={styles.skeletonItemSubText} />
                </View>
              </View>
            )
          }}
        /> :
          <FlatList
            data={searchQuery || sortedProducts ? filteredProducts : productData}
            renderItem={(item) => renderFlatListData(item)}
            numColumns={2}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => {
              return (
                <View style={styles.emptyListComponentContainer}>
                  <Text style={styles.emptyListComponentText}>Oops! Product Not Found</Text>
                </View>
              )
            }}
          />}
        <FilterModal
          isVisible={filterModalVisible}
          closeModal={closeModal}
          applyFilter={applyFilter}
          handleFilter={handleFilterValue}
        />
      </View>
    </View>
  );
};

export default ProductListingScreen;