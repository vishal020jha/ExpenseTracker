import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const savedExpenses = await AsyncStorage.getItem("expenses");
      setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);
    };
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name}:₹{item.amount}
          </Text>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Expense"
          onPress={() => navigation.navigate("AddExpense")}
        />
        <View style={styles.buttonSpace} />
        <Button
          title="View Summary"
          onPress={() => navigation.navigate("Summary")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpace: {
    height: 50,
  },
});
