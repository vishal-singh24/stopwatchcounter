import { Button, InteractionManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



const App = () => {
  const [counter, updateCounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const counterRef = useRef(null)

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    counterRef.current = setInterval(() => {
      updateCounter((counter) => counter + 1);
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(counterRef.current);
    setIsPaused(true);
  }
  const handleContinue = () => {
    if(counterRef.current){
      clearInterval(counterRef.current)
    }
    setIsPaused(false);
    counterRef.current = setInterval(() => {
      updateCounter((counter) => counter + 1)
    }, 1000)
  }
  const handleReset = () => {
    clearInterval(counterRef.current)
    
    setIsPaused(false)
    setIsActive(false)
    updateCounter(0)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(counter)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {
          !isActive && !isPaused ? (
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={handlePause}>
                <Text style={styles.buttonText} >Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </>
          )
        }
      </View>


    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black'

  },
  timerContainer: {
    borderWidth: 4,
    borderColor: 'black',
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    backgroundColor:'white'
  },
  timerText: {
    fontSize: 50,
    color: "black",
    
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 17,
    color: 'black'
  }
})