import React, {Component} from 'react';
import {Flex} from 'rebass';
import qs from 'qs';

import Results from './Results';
import SearchBox from './SearchBox';

class Search extends Component {
  state = {
    searchString: '',
    results: {},
  };

  componentDidUpdate() {
    const searchString = this.state.searchString;

    if (this.state.results[searchString]) {
      return;
    }

    this.fetchQuery();
  }

  searchForString = searchString => this.setState({searchString});

  fetchQuery = async () => {
    const searchString = this.state.searchString;
    const response = await fetch(
      `https://api.github.com/search/repositories?${qs.stringify({
        q: searchString,
        sort: 'stars',
        order: 'desc',
      })}`,
    );

    if (response.status === 200) {
      const data = await response.json();

      this.setState(({results}) => ({
        searchString,
        results: {
          ...results,
          [searchString]: {
            items: data.items,
            totalCount: data['total_count'],
          },
        },
      }));
    }
  };

  render() {
    console.log(this.state);
    return (
      <Flex flexDirection="column" alignItems="center">
        <SearchBox searchForString={this.searchForString} />
        <Results
          searchString={this.state.searchString}
          results={this.state.results[this.state.searchString]}
        />
      </Flex>
    );
  }
}

export default Search;
