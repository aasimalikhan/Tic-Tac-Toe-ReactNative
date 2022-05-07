import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, SafeAreaView, Pressable, Image, Dimensions, Alert} from 'react-native'

const windowWidth = Dimensions.get('window').width;

const Board = (props) => {

    const markPosition = (position) => {
        if(!props.markers_prop[position])
        {
          let temp = [...props.markers_prop]
          temp[position] = props.active_player_prop
          props.setMarkers_prop(temp)
          if(props.active_player_prop === 'X')
          {
            props.set_active_player_prop('O')
    
          }
          else{
            props.set_active_player_prop('X')
          }
        }
    }

    const show = (index) =>
    {
      //Light Mode
      if(props.mode_prop == 0)
      {
        if(props.markers_prop[index] ==='X')
        {
          return (<Image source={require('../assets/X.png')} style={BoardStyles.icon}/>)
        }
        if(props.markers_prop[index] === 'O')
        {
          return (<Image source={require('../assets/O.png')} style={BoardStyles.icon}/>)
        }
      }
      else if(props.mode_prop == 1)
      {
        if(props.markers_prop[index] ==='X')
        {
          return (<Image source={require('../assets/Xwhite.png')} style={BoardStyles.icon}/>)
        }
        if(props.markers_prop[index] === 'O')
        {
          return (<Image source={require('../assets/Owhite.png')} style={BoardStyles.icon}/>)
        }
      }
    }

    return (
        <SafeAreaView>
            <View style={BoardStyles.activeTurnContainer}>
                <View style={[BoardStyles.turn, BoardStyles.shadowProp, BoardStyles.activeX, {backgroundColor: props.active_player_prop === 'X' ? '#3afa05' : 'white'}, {shadowColor: props.active_player_prop === 'X' ? '#135701' : '#858585'}]}>
                <Text style={{fontFamily: 'Inter_900Black', fontSize: 30}}>X</Text>
                </View>
                <View style={[BoardStyles.turn, BoardStyles.shadowProp, BoardStyles.activeY, {backgroundColor: props.active_player_prop === 'O' ? '#3afa05' : 'white'}, {shadowColor: props.active_player_prop === 'X' ? '#135701' : '#858585'}]}>
                <Text style={{fontFamily: 'Inter_900Black', fontSize: 30}}>O</Text>
                </View>
            </View>
            <View style={BoardStyles.mainContainer}>
                {/* Top Left Cell */}
                <Pressable disabled={props.matrix_fill_prop[0]} style={[BoardStyles.cell, BoardStyles.cell_top_left, {backgroundColor: props.cell_colors_prop[0]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(0)}>
                {show(0)}
                </Pressable>

                {/* Top Mid Cell */}
                <Pressable disabled={props.matrix_fill_prop[1]} style={[BoardStyles.cell, BoardStyles.cell_top_mid, {backgroundColor: props.cell_colors_prop[1]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(1)}>
                {show(1)}
                </Pressable>

                {/* Top Right Cell */}
                <Pressable disabled={props.matrix_fill_prop[2]} style={[BoardStyles.cell, BoardStyles.cell_top_right, {backgroundColor: props.cell_colors_prop[2]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(2)}>
                {show(2)}
                </Pressable>

                {/* Mid Left Cell */}
                <Pressable disabled={props.matrix_fill_prop[3]} style={[BoardStyles.cell, BoardStyles.cell_mid_left, {backgroundColor: props.cell_colors_prop[3]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(3)}>
                {show(3)}
                </Pressable>

                {/* Mid Mid Cell */}
                <Pressable disabled={props.matrix_fill_prop[4]} style={[BoardStyles.cell, BoardStyles.cell_mid_mid, {backgroundColor: props.cell_colors_prop[4]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(4)}>
                {show(4)}
                </Pressable>

                {/* Mid Right Cell */}
                <Pressable disabled={props.matrix_fill_prop[5]} style={[BoardStyles.cell, BoardStyles.cell_mid_right, {backgroundColor: props.cell_colors_prop[5]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(5)}>
                {show(5)}
                </Pressable>

                {/* Bottom Left Cell */}
                <Pressable disabled={props.matrix_fill_prop[6]} style={[BoardStyles.cell, BoardStyles.cell_bottom_left, {backgroundColor: props.cell_colors_prop[6]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(6)}>
                {show(6)}
                </Pressable>

                {/* Bottom Mid Cell */}
                <Pressable disabled={props.matrix_fill_prop[7]} style={[BoardStyles.cell, BoardStyles.cell_bottom_mid, {backgroundColor: props.cell_colors_prop[7]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(7)}>
                {show(7)}
                </Pressable>

                {/* Bottom Right Cell */}
                <Pressable disabled={props.matrix_fill_prop[8]} style={[BoardStyles.cell, BoardStyles.cell_bottom_right, {backgroundColor: props.cell_colors_prop[8]}, {borderColor: props.mode_prop == 0 ? 'gray' : 'gray'}]} onPress={()=>markPosition(8)}>
                {show(8)}
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const BoardStyles = StyleSheet.create({
      mainContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
      },
    
      cell:{
        width: windowWidth/3.4,
        height: windowWidth/3.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 6,
        borderBottomWidth: 6,
      },
      
      cell_top_right:{
        borderRightWidth: 0,
      },
    
      cell_mid_right:{
        borderRightWidth: 0,
      },
    
      cell_bottom_left:{
        borderBottomWidth: 0
      },
    
      cell_bottom_right:{
        borderRightWidth: 0,
        borderBottomWidth: 0
      },
    
      cell_bottom_mid:{
        borderBottomWidth: 0,
      },
      
      icon:{
        height: windowWidth/6.5,
        width: windowWidth/6.5
      },
    
    
      activeTurnContainer:{
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
      },
    
      turn:{
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 45,
        width: 45,
        borderRadius: 5
      },
    
      shadowProp: {
        elevation: 20,
        shadowColor: '#000000',
      },
   
})

export default Board;