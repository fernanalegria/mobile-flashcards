import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Button, Form } from '../../common';
import baseStyles from '../../styles';
import { func } from 'prop-types';

class InputForm extends Component {
  static propTypes = {
    writeText: func.isRequired
  };

  state = {
    title: ''
  };

  /**
   * Sends the input to the parent component and resets the state
   */
  submit = () => {
    this.props.writeText(this.state.title).then(() => {
      this.setState({
        title: ''
      });
    });
  };

  /**
   * Updates the title state according to the user input
   * @param  {string} title
   */
  onTitleChange = title => {
    this.setState({
      title
    });
  };

  render() {
    const { title } = this.state;
    return (
      <Form>
        <TextInput
          value={title}
          style={baseStyles.textInput}
          onChangeText={this.onTitleChange}
          placeholder="Deck Title"
          clearButtonMode="always"
        />
        <Button
          text="Create"
          style={{ margin: 25 }}
          onPress={this.submit}
          disabled={!title}
        />
      </Form>
    );
  }
}

export default InputForm;
