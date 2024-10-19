import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CheckOutScreen = () => {

    return(
        <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '500', marginBottom: 20 }}>Payment</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: '#FFA451', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 50, width: 150, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Back to cart</Text>
                </TouchableOpacity>
            </View>
        </View>

    )  
}

export default CheckOutScreen;