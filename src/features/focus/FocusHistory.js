import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      { item.subject }
    </Text>
  );
}

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {focusHistory.length > 0 &&
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList 
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={ focusHistory }
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton title="clear" size={75} onPress={clearHistory} />
            </View>
          </>
        }
      </SafeAreaView>
      
    </>
  );
}

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status == 0 ? 'red' : 'green',
    fontSize: fontSizes.md
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.lg
  }
});

