import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FilterOption = ({ option, filterType, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.optionContainer, { backgroundColor: filterType === option.value ? '#FFF2E7' : 'white' }]}
    >
        <Text style={[styles.option, { color: filterType === option.value ? '#EB8D37' : '#222222' }]}>{option.text}</Text>
        {filterType === option.value && <Image source={require('../assets/TickLargeOutlined(1).png')} />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    optionContainer: {
        height: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    option: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24
    },
})

export default FilterOption;