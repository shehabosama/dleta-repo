import React, {Component} from 'react';
import {View, Image, TouchableHighlight, Text} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import {responsiveHeight, responsiveWidth} from '../utils/responsiveDimensions';
import moment from 'moment';

class CalendarStripComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          marginTop: 20,
          justifyContent: 'center',
        }}>
        <CalendarStrip
          //   calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: '#30415D',
          }}
          style={{height: 120, paddingTop: 10, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          // calendarColor={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: '#30415D'}}
          highlightDateNameStyle={{color: '#30415D'}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          iconContainer={{flex: 0.1}}
          startingDate={
            this.props.startingDate ? this.props.startingDate : moment()
          }
          onWeekChanged={this.props.onWeekChanged}
          datesBlacklist={this.props.datesBlacklist}
          onDateSelected={this.props.onDateSelected}
        />
      </View>
    );
  }
}
export default CalendarStripComponent;
