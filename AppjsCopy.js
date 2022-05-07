import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, SafeAreaView, Pressable, Image, Dimensions, Alert} from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black, Inter_400Regular, Inter_700Bold} from '@expo-google-fonts/inter';
import ToggleMode from './components/ToggleMode'

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const [active_player, set_active_player] = useState('X')
  const [mode, set_mode] = useState(0)
  const [markers, setMarkers] = useState([
                                  null, null, null,
                                  null, null, null,
                                  null, null, null
                                ])

  const markPosition = (position) => {
    if(!markers[position])
    {
      let temp = [...markers]
      temp[position] = active_player
      setMarkers(temp)
      if(active_player === 'X')
      {
        set_active_player('O')

      }
      else{
        set_active_player('X')
      }
    }
  }

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

    for(let i = 0; i < lines.length; i++)
    {
      const [e1, e2, e3] = lines[i]
      if(markers[e1] == 'X' && markers[e2] == 'X' && markers[e3] == 'X')
      {
        return 'X'
      }
      else if(markers[e1] == 'O' && markers[e2] == 'O' && markers[e3] == 'O')
      {
        return 'O'
      }
    }
    return null
  }

  useEffect(() => {
    let count = 0;
    let temp = [...markers]

    const winner = calculateWinner(markers);
    if(winner == 'X')
    {
      alert("Player X Won")
      resetMarkers();
    }
    else if(winner == 'O')
    {
      alert("Player O Won")
      resetMarkers();
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
        alert("Matrix Filled, Reset")
        resetMarkers();
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
        <SafeAreaView style={[styles.body, {backgroundColor: mode === 0 ? '#ffffff' : '#000000'}]}>
          <ToggleMode mode_prop = {mode} set_mode_prop = {set_mode} />
          {/* <Pressable style={[styles.mode_switch, styles.shadowProp2, {backgroundColor: mode === 0 ? '#fffee0' : '#360082'}]} onPress={()=>{{mode === 1 ? set_mode(0) : set_mode(1)}}}>
            <View>
             {mode === 0 ? <Image source={require(`./assets/light.png`)} style={styles.mode_btn}/> : <Image source={require(`./assets/dark.png`)} style={styles.mode_btn}/>}
            </View>
          </Pressable> */}
          <View style={[styles.headingText, {backgroundColor: ''}]}>
            <Image source={require('./assets/game_logo.png')} style={styles.icon}/>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20 }}></Text> 
          </View>
          <View style={[styles.playerInfo, {backgroundColor: 'black'}]}>
            
            <Text style={{ fontFamily: 'Inter_900Black', color: 'white', fontSize: 20 }}>Tic-Tac-Toe</Text> 
          </View>
          <View style={styles.activeTurnContainer}>
            <View style={[styles.turn, styles.shadowProp, styles.activeX, {backgroundColor: active_player === 'X' ? '#3afa05' : 'white'}, {shadowColor: active_player === 'X' ? '#135701' : '#858585'}]}>
              <Text style={{fontFamily: 'Inter_900Black', fontSize: 30}}>X</Text>
            </View>
            <View style={[styles.turn, styles.shadowProp, styles.activeY, {backgroundColor: active_player === 'O' ? '#3afa05' : 'white'}, {shadowColor: active_player === 'X' ? '#135701' : '#858585'}]}>
              <Text style={{fontFamily: 'Inter_900Black', fontSize: 30}}>O</Text>
            </View>
          </View>
          <View style={styles.mainContainer}>
            {/* Top Left Cell */}
            <Pressable style={[styles.cell, styles.cell_top_left]} onPress={()=>markPosition(0)}>
              {markers[0] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[0] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Top Mid Cell */}
            <Pressable style={[styles.cell, styles.cell_top_mid]} onPress={()=>markPosition(1)}>
              {markers[1] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[1] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Top Right Cell */}
            <Pressable style={[styles.cell, styles.cell_top_right]} onPress={()=>markPosition(2)}>
              {markers[2] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[2] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Mid Left Cell */}
            <Pressable style={[styles.cell, styles.cell_mid_left]} onPress={()=>markPosition(3)}>
              {markers[3] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[3] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Mid Mid Cell */}
            <Pressable style={[styles.cell, styles.cell_mid_mid]} onPress={()=>markPosition(4)}>
              {markers[4] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[4] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Mid Right Cell */}
            <Pressable style={[styles.cell, styles.cell_mid_right]} onPress={()=>markPosition(5)}>
              {markers[5] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[5] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Bottom Left Cell */}
            <Pressable style={[styles.cell, styles.cell_bottom_left]} onPress={()=>markPosition(6)}>
              {markers[6] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[6] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Bottom Mid Cell */}
            <Pressable style={[styles.cell, styles.cell_bottom_mid]} onPress={()=>markPosition(7)}>
              {markers[7] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[7] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>

            {/* Bottom Right Cell */}
            <Pressable style={[styles.cell, styles.cell_bottom_right]} onPress={()=>markPosition(8)}>
              {markers[8] ==='X' && <Image source={require('./assets/X.png')} style={styles.icon}/>}
              {markers[8] === 'O' && <Image source={require('./assets/O.png')} style={styles.icon}/>}
            </Pressable>
          </View>
          <Pressable style={styles.replay_button}  onPress={resetMarkers}>
            <View style={styles.replay_button_container}>
              <Image source={require('./assets/replay.png')} style={styles.replay_btn}/> 
            </View>
          </Pressable>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
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
