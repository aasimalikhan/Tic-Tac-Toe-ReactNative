import React from "react";
import {StyleSheet, View, Pressable, Image} from 'react-native'


const ToggleMode = (props) => {
    return (
        <Pressable style={[ToggleModestyles.mode_switch, ToggleModestyles.shadowProp2, {backgroundColor: props.mode_prop === 0 ? '#fffee0' : '#360082'}]} onPress={()=>{{props.mode_prop === 1 ? props.set_mode_prop(0) : props.set_mode_prop(1)}}}>
            <View>
             {props.mode_prop === 0 ? <Image source={require(`../assets/light.png`)} style={ToggleModestyles.mode_btn}/> : <Image source={require(`../assets/dark.png`)} style={ToggleModestyles.mode_btn}/>}
            </View>
        </Pressable>
    )
}

const ToggleModestyles = StyleSheet.create({
    shadowProp2: {
        paddingVertical: 10,
        elevation: 30,
        shadowColor: '#000000',
      },
    
      mode_switch:{
        position: 'absolute',
        top: 30,
        right: 10,
        height: 40,
        width: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
      },
    
      mode_btn:{
        height: 25,
        width: 25,
      }
})
  

export default ToggleMode