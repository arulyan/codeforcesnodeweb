import React, { useState } from "react";
import { FlatList, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { PageTitle } from "../components/styles";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Tags from "react-native-tags";

const screenWidth = Dimensions.get("window").width;
const COLORS = { primary: '#1f145c', white: '#fff' };

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29dxx',
        title: 'Fourth Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const Analysis = () => {
    const [textInput, setTextInput] = useState('');

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
                strokeWidth: 2 // optional
            },
            {
                data: [29, 49, 29, 90, 10, 23],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        // backgroundGradientFrom: "#1E2923",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "#08130D",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgb(255,255,255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    const addItem = ({ item }) => {

    }

    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}>

            <Tags
                initialText="monkey"
                textInputProps={{
                    placeholder: "Any type of animal"
                }}
                initialTags={["dog", "cat", "chicken"]}
                onChangeTags={tags => console.log(tags)}
                onTagPress={(index, tagLabel, event, deleted) => console.log("This was deleted:"+tagLabel)
                    // console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                containerStyle={{ justifyContent: "center" }}
                inputStyle={{ backgroundColor: "white" }}
                renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                    <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                        <Text>{tag}</Text>
                    </TouchableOpacity>
                )}
            />

            <View>
                <PageTitle>
                    Analysis
                </PageTitle>

                <FlatList
                    horizontal={true}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}

                />
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />

            </View>
            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={textInput}
                        placeholder="Add Handle Name"
                        onChangeText={text => setTextInput(text)}
                    />
                </View>
                <TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="add" color="white" size={30} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 15,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
    },
    inputContainer: {
        height: 50,
        paddingHorizontal: 20,
        elevation: 40,
        backgroundColor: COLORS.white,
        flex: 1,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        justifyContent: 'center',
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: COLORS.primary,
        elevation: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Analysis_1;