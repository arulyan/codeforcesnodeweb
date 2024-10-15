import React, { useState } from "react";
import { FlatList, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, } from "react-native";
import { PageTitle } from "../components/styles";
// import {
//     LineChart,
//     BarChart,
//     PieChart,
//     ProgressChart,
//     ContributionGraph,
//     StackedBarChart
// } from "react-native-chart-kit";

import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Tags from "react-native-tags";

// import PureChart from 'react-native-pure-chart';
// import PropTypes from 'prop-types';
// import Chart from 'react-native-chart';
// import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { LineChart, Path, Grid } from 'react-native-svg-charts'

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['componentWillReceiveProps']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
    _console.warn(message);
  }
};

const screenWidth = Dimensions.get("window").width;
const COLORS = { primary: '#1f145c', white: '#fff' };


// const Analysis  = () => {
//   // let sampleData = [
//   //     {
//   //       seriesName: 'series1',
//   //       data: [
//   //         {x: '2018-02-01', y: 30},
//   //         {x: '2018-02-02', y: 200},
//   //         {x: '2018-02-03', y: 170},
//   //         {x: '2018-02-04', y: 250},
//   //         {x: '2018-02-05', y: 10}
//   //       ],
//   //       color: '#297AB1'
//   //     },
//   //     {
//   //       seriesName: 'series2',
//   //       data: [
//   //         {x: '2018-02-01', y: 20},
//   //         {x: '2018-02-02', y: 100},
//   //         {x: '2018-02-03', y: 140},
//   //         {x: '2018-02-04', y: 550},
//   //         {x: '2018-02-05', y: 40}
//   //       ],
//   //       color: 'red'
//   //     }
//   //   ]
//   // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
//   const data1 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
//   const data2 = [-87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18]

//   //Array of datasets, following this syntax:
//   const data = [
//     {
//       data: data1,
//       svg: { stroke: 'purple' },
//     },
//     {
//       data: data2,
//       svg: { stroke: 'green' },
//     },
//   ]
//   return (
//     // <SafeAreaView>
//     //   <View>
//     //     <PageTitle>
//     //       Analysis
//     //     </PageTitle>
//     //   </View>
//     <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
//       <LineChart
//         style={{ height: 200 }}
//         data={data}
//         contentInset={{ top: 20, bottom: 20 }}
//       >
//         <Grid />
//       </LineChart>
//     </View>
//     // </SafeAreaView>
//   );
// }


class Analysis extends React.PureComponent {

  render() {

    // const data1 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    // const data2 = [-87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18, 100, 12]
    const data1 = [
      {
        month: new Date(2015, 0, 1),
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 1, 1),
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 2, 1),
        apples: 640,
        bananas: 960,
        cherries: 3640,
        dates: 400,
      },
      {
        month: new Date(2015, 3, 1),
        apples: 3320,
        bananas: 480,
        cherries: 640,
        dates: 400,
      },
    ]
    const data2 = [
      {
        month: new Date(2015, 1, 1),
        apples: 3000,
        bananas: 1920,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 2, 1),
        apples: 2600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
      },
      {
        month: new Date(2015, 3, 1),
        apples: 64,
        bananas: 960,
        cherries: 3640,
        dates: 400,
      },
      {
        month: new Date(2015, 4, 1),
        apples: 332,
        bananas: 480,
        cherries: 640,
        dates: 400,
      },
    ]

    //Array of datasets, following this syntax:
    const data = [
      {
        data: data1,
        svg: { stroke: 'purple' },
      },
      {
        data: data2,
        svg: { stroke: 'green' },
      },
    ]

    return (
      <LineChart
        style={{ height: 200 }}
        data={data}
        contentInset={{ top: 20, bottom: 20 }}
        yAccessor={({item}) => item.apples}
        xAccessor={({item}) => item.month}
      >
        <Grid />
      </LineChart>
    )
  }
}

export default Analysis;