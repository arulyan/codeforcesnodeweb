import React, { useState, useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PageTitle } from "../components/styles";
import { CredentialsContext } from "../components/CredentialsContext";
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { baseAPIUrl } from "../components/shared";

const Leaderboard = () => {

    const [data3, setData3] = useState([]);

    let data2 = [];
    function compare(a, b) {
        return a.rating > b.rating ? -1 : 1;
    }

    const url = `${baseAPIUrl}/user/getUsers`;
    const fetechData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("This is me: " + data[0].handle);
        for (let i = 0; i < data.length; i++) {
            const res = await fetch(`https://codeforces.com/api/user.info?handles=${data[i].handle}`);
            const data1 = await res.json();
            console.log(data1.result[0].handle);
            data2.push(data1.result[0]);
        }
        console.log("Lets see data2:\n");
        data2.sort(compare);
        console.log(data2);
        setData3(data2)
    }

    const renderItem = ({ item }) => {
        return (
            <Text style={styles.item}>{item.handle}</Text>
        );
    };

    useEffect(() => {
        fetechData();
    }, [])

    // useEffect(() => {
    //     const url = `${baseAPIUrl}/user/getUsers`;
    //     axios.get(url)
    //         .then(async (response) => {
    //             let data = response.data;
    //             console.log(data[0].handle);
    //             for (let i = 0; i < data.length; i++) {
    //                 await axios.get(`https://codeforces.com/api/user.info?handles=${data[i].handle}`)
    //                     .then(function (response) {
    //                         data2.push(response.data.result[0]);
    //                         console.log(response.data.result[0]);
    //                     })
    //                     .catch(function (err) {
    //                         console.log(err);
    //                     })
    //             }
    //             console.log("Lets see data2:\n");
    //             data2.sort(compare);
    //             console.log(data2);
    //         })
    //         .catch(error => console.log(error))
    // })

    return (
        <View>
            <PageTitle>
                Leaderboard
            </PageTitle>
            <FlatList
                data={data3}
                renderItem={renderItem}
                keyExtractor={(item) => item.handle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

export default Leaderboard;