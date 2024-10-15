import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MsgBox, PageTitle } from "../components/styles";
import { baseAPIUrl } from "../components/shared";

// const DATA = [
//     {
//         title: "Upcoming Contest",
//         data: ["Pizza", "Burger", "Risotto"]
//     },
//     {
//         title: "Past Contest",
//         data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//     },
//     {
//         title: "sdfsdfkjfsdkljkjf",
//         data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//     }
// ];

const PreviousContest = ({ navigation }) => {

    const Item = ({ title }) => (
        <TouchableOpacity onPress={() => {
            if(title.phase !== "BEFORE")
                navigation.push('Standings', { contest: title })
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{title.name}</Text>
            </View>
        </TouchableOpacity>
    );

    // const [Data, setData] = useState([]);
    // const [Data2, setData2] = useState([]);
    const [DATA, setData] = useState([]);

    const url = "https://codeforces.com/api/contest.list?gym=false";
    const fetechData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data.result);
        let res = data.result;
        let i, data1 = [], data2 = [];
        for (i = 0; i < res.length; i++)
            if (res[i].phase === "BEFORE") data1.push(res[i]);
            else break;
        for (; i < 400 && i < res.length; i++) data2.push(res[i]);
        // setData(data1);
        // setData2(data2);
        console.log("UPCOMING CONTESTS:\n")
        for (i = 0; i < data1.length; i++) console.log(data1[i].name)
        for (i = 0; i < data2.length; i++) console.log(data2[i].name)
        let FakeData = [
            {
                title: "Upcoming",
                data: data1
            },
            {
                title: "Past",
                data: data2
            }
        ]
        setData(FakeData);
    }

    // const renderItem = ({ item }) => {
    //     return (
    //         <Text style={styles.item}>{item.handle}</Text>
    //     );
    // };

    useEffect(() => {
        fetechData();
    }, [])

    return (
        <View style={styles.view}>
            <PageTitle>
                Contests
            </PageTitle>
            <SectionList
                stickySectionHeadersEnabled={true}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20
    },
    view: {
        marginBottom: 60
    }
});


export default PreviousContest;