import React, { Component } from "react"
import PropTypes from 'prop-types'
import { AppState, BackHandler, Platform } from "react-native"

export default class AndroidBackButton extends Component {
  constructor(props) {
    super(props)
    this.listener = null
    this.backButtonPressFunction = () => false
    if (props.onPress) {
      this.backButtonPressFunction = props.onPress
    }
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      AppState.addEventListener('change', state => {
        if (state == 'background') {
          this.listener = null;
        }
      })
    }

    if (Platform.OS === "android" && this.listener === null) {
      this.listener = BackHandler.addEventListener("hardwareBackPress", () => {
        return this.backButtonPressFunction()
      })
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android" && this.listener !== null) {
      BackHandler.removeEventListener('hardwareBackPress', this.listener);
    }
  }

  render() {
    return null
  }
}

AndroidBackButton.propTypes = {
  onPress: PropTypes.func.isRequired
}