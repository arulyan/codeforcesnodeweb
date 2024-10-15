import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { baseAPIUrl } from '../components/shared';
import { PageTitle } from '../components/styles';


const Standings = ({ route }) => {
    const [standings, setStandings] = useState([]);

    const contest = route.params.contest;
    // console.log("Its been printed:\n"+contest);

    // Memory Leak Management
    let isMounted = true; // track whether component is mounted

    const url = `${baseAPIUrl}/user/getUsers`;
    const fetechData = async () => {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("This is me: " + data[0].handle);
        let str = data[0].handle;
        for (let i = 1; i < data.length; i++) str += ";" + data[i].handle;
        const res = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contest.id}&handles=${str}`);
        const data1 = await res.json();
        console.log(data1.result.rows);
        if (isMounted)
            setStandings(data1.result.rows);
    }

    const renderInnerItem = ({ item, index }) => {
        let ch = String.fromCharCode(65 + index);
        return (
            <Text style={styles.inner}>{ch}.  {item.points} pts {item.bestSubmissionTimeSeconds && (
                <Text>Time Submitted={parseInt(item.bestSubmissionTimeSeconds / 60)} mins</Text>
            )}</Text>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text style={styles.item}>{item.party.members[0].handle} Rank={item.rank} Points={item.points}</Text>
                <FlatList
                    data={item.problemResults}
                    renderItem={renderInnerItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    useEffect(() => {
        fetechData();
        return () => {
            // clean up
            isMounted = false;
        };
    }, [])


    return (
        <View>
            <PageTitle>
                Standings
            </PageTitle>
            {standings.length === 0 && (
                <Text>No Participation</Text>
            )}
            {standings.length !== 0 && (
                <FlatList
                    data={standings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.party.members[0].handle}
                />
            )}

        </View>
    );
};

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
    inner: {
        marginLeft: 20
    }
});

export default Standings