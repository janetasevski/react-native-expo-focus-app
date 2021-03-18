import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes,
  isPaused,
  onProgress,
  onEnd
}) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  const countDown = useCallback(() => {
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }, [onProgress, minutes, onEnd]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused, countDown])

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes])

  const minute = Math.floor(millis / (1000 * 60)) % 60;
  const secconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(secconds)}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxxl,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  },
});