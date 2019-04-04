import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import SubmitButton from '../../common/SubmitButton';
import { colors } from '../../styles';

class InputForm extends Component {
  state = {
    title: ''
  };

  submitAndClear = () => {
    this.props.writeText(this.state.title).then(() => {
      this.setState({
        title: ''
      });
    });
  };

  onTitleChange = title => {
    this.setState({
      title
    });
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.form}>
        <TextInput
          value={title}
          style={styles.input}
          onChangeText={this.onTitleChange}
          placeholder="Deck Title"
          clearButtonMode="always"
        />
        <SubmitButton
          text="Create"
          style={{ margin: 25 }}
          onPress={this.submitAndClear}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.boulder,
    margin: 25
  }
});

export default InputForm;
