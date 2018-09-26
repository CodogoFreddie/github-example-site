import React, {Component} from 'react';
import {Flex, Box, Text} from 'rebass';

import Markdown from 'react-markdown';

class DetailedView extends Component {
  state = {
    stars: 0,
    readme: '',
    loaded: false,
  };

  getReadMe = async () => {
    const {repo, user} = this.props;

    const resp = await fetch(
      `https://api.github.com/repos/${user}/${repo}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.VERSION.raw',
        },
      },
    );

    const readme = await resp.text();

    this.setState({
      readme,
    });
  };

  getStarsAndForks = async () => {
    const {repo, user} = this.props;

    const resp = await fetch(`https://api.github.com/repos/${user}/${repo}`);

    const data = await resp.json();
    console.log({data});

    this.setState({
      forks: data.forks,
      stars: data['stargazers_count'],
    });
  };

  componentDidMount() {
    Promise.all([this.getReadMe(), this.getStarsAndForks()]).then(() =>
      this.setState({loaded: true}),
    );
  }

  render() {
    const {repo, user} = this.props;
    const {forks, stars, readme, loaded} = this.state;

    return (
      <Flex flexDirection="column" alignItems="center">
        <Flex
          flexDirection="row"
          alignItems="center"
          alignSelf="stretch"
          bg="red"
          p={4}>
          <Text textAlign="center" flex={1} fontSize={4}>
            {user} / {repo}
          </Text>
        </Flex>
        {loaded ? (
          <Flex
            flexDirection="column"
            width={['100%', '50vw']}
            alignItems="stretch">
            <Box bg="green" mb={2}>
              <Text>stars: {stars}</Text>
              <Text>forks: {forks}</Text>
            </Box>
            <Box bg="lightgrey">
              <Markdown skipHtml source={readme} />
            </Box>
          </Flex>
        ) : (
          'Loading'
        )}
      </Flex>
    );
  }
}

export default DetailedView;
