import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {PieChart} from "react-native-chart-kit";


export default function SummaryScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const savedExpenses = await AsyncStorage.getItem("expenses");
      if (savedExpenses) {
        const expenses = JSON.parse(savedExpenses);
        const categories = expenses.reduce((acc, exp) => {
          acc[exp.name] = (acc[exp.name] || 0) + exp.amount;
          return acc;
        }, {});
        setData(
          Object.keys(categories).map((key) => ({
            name: key,
            amount: categories[key],
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            legendFontColor: "gray",
            legendFontSize: 15,
          }))
        );
      }
    };
    fetchExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Summary</Text>
      <PieChart
      data={data}
      width={300}
      height={220}
      chartConfig={{
        color: () => `#000`,
      }}
      accessor="amount"
      backgroundColor="transparent"
      paddingLeft="15"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
  },
});
