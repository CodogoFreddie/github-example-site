import React from 'react';
import {Box, Text, Flex} from 'rebass';
import {Link} from '@reach/router';

const Result = ({
  name,
  description,
  forks,
  id,
  owner: {login},
  stargazers_count,
}) => (
  <Box bg="lightgrey" px={2} py={1} my={2} mx={[2, 0]}>
    <Link to={`/detail/${login}/${name}`}>
      <Flex justifyContent="space-between">
        <Text fontSize={3}>
          {login} / {name}
        </Text>
        <Box fontSize={1}>
          <Text>stars: {stargazers_count}</Text>
          <Text>forks: {forks}</Text>
        </Box>
      </Flex>
      <Box>
        <Text fontSize={2}>{description}</Text>
      </Box>
    </Link>
  </Box>
);

export default Result;
