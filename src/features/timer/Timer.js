import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, onCancel }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onPressStartHandler = () => {
    setIsStarted(true);
  }

  const onPressStopHandler = () => {
    setIsStarted(false);
  }

  const onProgressHandler = (val) => {
    setProgress(val);
  }

  const changeTimeHandler = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const vibrate = () => {
    if (Platform.OS == "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 4000);
    } else {
      Vibration.vibrate(4000);
    }
  }

  const onEndHandler = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgressHandler}
          onEnd={onEndHandler} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar 
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }} 
        />
      </View>
      <View style={styles.buttonWrapper}> 
        <Timing changeTime={changeTimeHandler} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={onPressStopHandler} />
        ) : (
          <RoundedButton title="start" onPress={onPressStartHandler} />
        )}
      </View>
      <View style={styles.cancelWrapper}>
        <RoundedButton title="cancel" size={70} onPress={onCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: 'center'
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flexDirection: "row",
    flex: 0.2,
    padding: 50,
    justifyContent: "center",
    alignItems: 'center'
  },
  cancelWrapper: {
    flex: 0.1,
    marginLeft: 8,
    marginBottom: 20
  }
});