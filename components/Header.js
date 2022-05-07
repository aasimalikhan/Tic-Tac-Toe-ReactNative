import React from "react";
import {StyleSheet, View, Image, Dimensions, Text} from 'react-native'

const windowWidth = Dimensions.get('window').width;

const Header = (props) => {
    return (
        <View style={[Headerstyles.headingText, {backgroundColor: ''}]}>
            <Image source={require('../assets/game_logo.png')} style={Headerstyles.icon}/>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: props.mode_prop === 0 ? 'black' : 'white'}}>Tic Tac Toe</Text> 
        </View>
    )
}

const Headerstyles = StyleSheet.create({
    headingText:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },

    icon:{
        height: windowWidth/6.5,
        width: windowWidth/6.5
    },
})
  

export default Header