import React, { useState, Component } from "react";
import { FlatList, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { PageTitle } from "../components/styles";

import { Dimensions } from "react-native";

import Tags from "react-native-tags";
import { Icon } from 'react-native-elements';
import TagInput from 'react-native-tags-input';

// Graph Library
import PureChart from 'react-native-pure-chart';

// const mainColor = '#3ca897';
const mainColor = '#fff'

const screenWidth = Dimensions.get("window").width;
const COLORS = { primary: '#1f145c', white: '#fff' };

// const Analysis = () => {

//     return (
//         <View>
//             <PageTitle>
//                 Analysis
//             </PageTitle>
//             <Tags
//                 initialText="monkey"
//                 textInputProps={{
//                     placeholder: "Any type of animal"
//                 }}
//                 initialTags={["dog", "cat", "chicken"]}
//                 onChangeTags={tags => console.log(tags)}
//                 onTagPress={(index, tagLabel, event, deleted) =>
//                     console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
//                 }
//                 containerStyle={{ justifyContent: "center" }}
//                 inputStyle={{ backgroundColor: "white" }}
//                 renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
//                     <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
//                         <Text>{tag}</Text>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// }


// export default Analysis;

export default class Analysis_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                tag: '',
                tagsArray: []
            },
            tagsColor: mainColor,
            tagsText: '#1f145c',
        };
    }

    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    };

    render() {

        let sampleData = [30, 200, 170, 250, 10]

        return (
            <View style={styles.container}>
                <PageTitle>
                    Analysis
                </PageTitle>
                <TagInput
                    updateState={this.updateTagState}
                    tags={this.state.tags}
                    placeholder="Tags..."
                    label='Press space to add a tag'
                    labelStyle={{ color: '#1f145c' }}
                    leftElement={<Icon name={'tag-multiple'} type={'material-community'} color={this.state.tagsText} />}
                    leftElementContainerStyle={{ marginLeft: 3 }}
                    containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                    inputContainerStyle={[styles.textInput, { backgroundColor: this.state.tagsColor }]}
                    inputStyle={{ color: this.state.tagsText }}
                    onFocus={() => this.setState({ tagsColor: '#fff', tagsText: '#1f145c' })}
                    onBlur={() => this.setState({ tagsColor: mainColor, tagsText: '#1f145c' })}
                    autoCorrect={false}
                    tagStyle={styles.tag}
                    tagTextStyle={styles.tagText}
                    keysForTag={' '} />
                <PureChart data={sampleData} type='line' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    textInput: {
        height: 45,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 2,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#1f145c'
    },
});