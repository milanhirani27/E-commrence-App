import React from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";

const SearchInput = ({ onChange, isVisible, onClose, inputValue, handleFilter }) => {
    const onCloseModalButton = () => {
        handleFilter('');
        onClose();
    };

    return (
        <View style={styles.container}>
            {!inputValue && <SearchIcon />}
            <TextInput
                style={[
                    styles.textInput,
                    { borderTopRightRadius: !isVisible && 16, borderBottomEndRadius: !isVisible && 16 },
                    { borderTopLeftRadius: isVisible && 16, borderBottomLeftRadius: isVisible && 16 }
                ]}
                placeholder='Search Product'
                placeholderTextColor={'#86869E'}
                value={inputValue}
                onChangeText={onChange}
                keyboardAppearance="default"
            />
            {inputValue && <CloseButton onCloseModalButton={onCloseModalButton} />}
        </View>
    );
};

const SearchIcon = () => (
    <View style={[styles.iconContainer,
     { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
     ]}>
        <Image source={require('../assets/Search.png')} />
    </View>
);

const CloseButton = ({ onCloseModalButton }) => (
    <TouchableOpacity style={[styles.iconContainer, 
    { borderTopRightRadius: 16, borderBottomRightRadius: 16 }
    ]} onPress={onCloseModalButton}>
        <Image source={require('../assets/close_ring_duotone.png')} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'row',
        width: "80%"
    },
    textInput: {
        height: 60,
        justifyContent: 'flex-start',
        width: "80%",
        fontSize: 14,
        backgroundColor: '#F3F4F9',
        fontWeight: '400',
        lineHeight: 21,
        paddingHorizontal: 10,
    },
    iconContainer: {
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F9'
    }
});

export default SearchInput;