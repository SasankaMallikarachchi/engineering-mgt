
/*
 *  Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the 'License'); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import axios from 'axios';

export let getChartData = chartSummary => {
  let issueCountDetails = [];
  for (let i = 0; i < chartSummary.length; i++) {
    let issueCount = {
      name: chartSummary[i].name,
      data: {}
    }

    let summaryData = chartSummary[i].data;

    for (let key in summaryData) {
      if (summaryData.hasOwnProperty(key)) {
        let sumDate = summaryData[key].date;
        issueCount.data[sumDate] = summaryData[key].count;
      }
    }
    issueCountDetails.push(issueCount);
  }
  return issueCountDetails;
};

export default class OpenVsClosedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      chartSummary: []
    };
  }

  componentDidMount() {
    const getProductNamesURL =
      'http://' +
      process.env.REACT_APP_HOST +
      ':' +
      process.env.REACT_APP_PORT +
      '/gitIssues/count';
    axios
      .create({
        withCredentials: false
      })
      .get(getProductNamesURL)
      .then(res => res.data)
      .then(
        result => {
          this.setState({
            isLoaded: true,
            chartSummary: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    if (!this.state.isLoaded) {
      return <p>Loading...</p>;
    }
    var chartData = getChartData(this.state.chartSummary);
    return (
      <div>
        <LineChart
          data={chartData}
          colors={['#B80000', '#2E7442']}
          curve={false}
          height={this.props.height || ''}
          messages={{ empty: 'No data available' }}
          library={{
            legend: {
              labels: {
                fontColor: '#3f51b5'
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: { fontColor: '#3f51b5' },
                  scaleLabel: { fontColor: '#3f51b5' }
                }
              ],
              xAxes: [
                {
                  ticks: { fontColor: '#3f51b5' }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}
