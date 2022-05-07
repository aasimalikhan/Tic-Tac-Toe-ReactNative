import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Alert} from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold} from '@expo-google-fonts/inter';

import ToggleMode from './components/ToggleMode'
import Header from './components/Header'
import Board from './components/Board'
import Replay from './components/Replay'

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const [active_player, set_active_player] = useState('X')
  const [mode, set_mode] = useState(0)
  const [markers, setMarkers] = useState([
    null, null, null,
    null, null, null,
    null, null, null
  ])
  const [cell_colors, setCell_colors] = useState(['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)',
  'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)',
  'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)'])
  const [matrix_fill, setMatrix_fill] = useState([false, false, false,
    false,false,false,
    false,false,false,])

  

  const promptUser = () => {
      const title = 'Choose starting Player';
      const message = 'Please make your selection.';
      const buttons = [
          { text: 'Cancel', type: 'cancel' },
          { text: 'X', onPress: () => set_active_player('X') },
          { text: 'O', onPress: () => set_active_player('O') }
      ];
      Alert.alert(title, message, buttons);
  }

  const resetMarkers = () => {
    setMarkers([
      null, null, null,
      null, null, null,
      null, null, null
    ])

    setCell_colors(['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)',
    'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)',
    'rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)','rgba(255, 255, 255, 0)'])

    
    const random_number = Math.floor(Math.random() * 10);
    if(random_number >= 0 && random_number <= 4)
    {
      set_active_player('X')
    }
    else
    {
      set_active_player('O')
    }
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    const colorsTemp = [...cell_colors];

    for(let i = 0; i < lines.length; i++)
    {
      const [e1, e2, e3] = lines[i]
      if(markers[e1] == 'X' && markers[e2] == 'X' && markers[e3] == 'X')
      {
        colorsTemp[e1] = 'rgba(16, 249, 0, 0.51)'
        colorsTemp[e2] = 'rgba(16, 249, 0, 0.51)'
        colorsTemp[e3] = 'rgba(16, 249, 0, 0.51)'
        setCell_colors(colorsTemp)
        return 'X'
      }
      else if(markers[e1] == 'O' && markers[e2] == 'O' && markers[e3] == 'O')
      {
        colorsTemp[e1] = 'rgba(16, 249, 0, 0.51)'
        colorsTemp[e2] = 'rgba(16, 249, 0, 0.51)'
        colorsTemp[e3] = 'rgba(16, 249, 0, 0.51)'
        setCell_colors(colorsTemp)
        return 'O'
      }
    }
    return null
  }

  useEffect(() => {
    let count = 0;
    let temp = [...markers]
    const fillable = [...matrix_fill]

    const winner = calculateWinner(markers);
    if(winner == 'X')
    {
      for(let i = 0; i < fillable.length; i++)
      {
        fillable[i] = true;
      }
      setMatrix_fill(fillable);

      const myTimeout = setTimeout(() => {
        for(let i = 0; i < fillable.length; i++)
        {
          fillable[i] = false;
        }
        setMatrix_fill(fillable)
        alert("Player X Won")
        resetMarkers();
      }, 700);

    }
    else if(winner == 'O')
    {
      for(let i = 0; i < fillable.length; i++)
      {
        fillable[i] = true;
      }
      setMatrix_fill(fillable);

      const myTimeout = setTimeout(() => {
        for(let i = 0; i < fillable.length; i++)
        {
          fillable[i] = false;
        }
        setMatrix_fill(fillable)
        alert("Player O Won")
        resetMarkers();
      }, 700);
    }
    else{
      for(let i = 0; i < temp.length; i++)
      {
        if(temp[i] != null)
        {
          count++;
        }
      }

      if(count == temp.length)
      {
        setCell_colors(['rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)',
        'rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)',
        'rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)','rgba(249, 0, 29, 0.42)'])
        
        const myTimeout = setTimeout(() => {
          alert("Matrix Filled, Reset")
          resetMarkers();
        }, 700);
        
      }
    }
  }, [markers])

  useEffect(() => {
    promptUser();
  }, [])

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
        <SafeAreaView style={[styles.body, {backgroundColor: mode === 0 ? '#ffffff' : '#070017'}]}>
          <ToggleMode mode_prop = {mode} set_mode_prop = {set_mode} />
          <Header mode_prop={mode}/>
          <View style={[styles.rules, {backgroundColor: '#9500ff'}]}>
            <Text style={{ fontFamily: 'Inter_900Black', color: 'white', fontSize: 12 }}>Play the classic Tic-Tac-Toe game (also called Noughts and Crosses) with two players.</Text> 
          </View>
          <Board mode_prop={mode} markers_prop = {markers} active_player_prop = {active_player} set_active_player_prop = {set_active_player} setMarkers_prop = {setMarkers} cell_colors_prop = {cell_colors}  setCell_colors_prop = {setCell_colors} matrix_fill_prop={matrix_fill} setMatrix_fill_prop={setMatrix_fill}/>
          <Replay markers_prop = {markers} active_player_prop = {active_player} set_active_player_prop = {set_active_player} setMarkers_prop = {setMarkers} resetMarkers_prop = {resetMarkers}/>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
  }, 

  rules:{
    color: '',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  }, 

  playerInfo:{
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 50
  }, 

  headingText:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },

  playerTxt:{
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  mainContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  cell:{
    width: windowWidth/3.4,
    height: windowWidth/3.4,
    backgroundColor: 'pink',
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

  replay_button:{
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  replay_button_container:{
    height: 60,
    width: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },

  replay_btn:{
    height: 40,
    width: 40,
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

export default App;


