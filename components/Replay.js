import React from "react";
import {Pressable, StyleSheet, View, Image, Dimensions, Text} from 'react-native'

const windowWidth = Dimensions.get('window').width;

const Replay = (props) => {

    return (
        <Pressable style={Replaystyles.replay_button}  onPress={props.resetMarkers_prop}>
            <View style={Replaystyles.replay_button_container}>
              <Image source={require('../assets/replay.png')} style={Replaystyles.replay_btn}/> 
            </View>
        </Pressable>
    )
}

const Replaystyles = StyleSheet.create({
    replay_button:{
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      replay_button_container:{
        height: 60,
        width: 60,
        backgroundColor: '#9500ff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
      },
    
      replay_btn:{
        height: 40,
        width: 40,
      },
})
  

export default Replay