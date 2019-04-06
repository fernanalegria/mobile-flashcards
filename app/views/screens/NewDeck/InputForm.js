import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Button, Form } from '../../common';
import baseStyles from '../../styles';

class InputForm extends Component {
  state = {
    title: ''
  };

  submit = () => {
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
        />
      </Form>
    );
  }
}

export default InputForm;
