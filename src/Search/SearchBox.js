import React, {Component} from 'react';
import {Text, Flex} from 'rebass';

class SearchBox extends Component {
  state = {
    searchString: '',
  };

  setSearchString = e => {
    const searchString = e.target.value;
    this.setState({
      searchString,
    });

    if (this.debounce) {
      clearTimeout(this.debounce);
      this.debounce = null;
    }

    this.debounce = setTimeout(this.props.searchForString, 500, searchString);
  };

  render() {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        alignSelf="stretch"
        bg="red"
        p={4}>
        <Text fontSize={4}>Search for a github repo</Text>
        <input
          value={this.state.searchString}
          onChange={this.setSearchString}
        />
      </Flex>
    );
  }
}

export default SearchBox;
