import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function AddExpenseScreen({ navigation }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const saveExpense = async () => {
    const newExpense = { id: Date.now(), name, amount: parseFloat(amount) };
    const savedExpenses = await AsyncStorage.getItem("expenses");
    const expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
    expenses.push(newExpense);
    await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Expense Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save Expense" onPress={saveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
