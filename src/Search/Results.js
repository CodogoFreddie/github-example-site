import React from 'react';
import {Box, Text, Flex} from 'rebass';

import Result from './Result';

const Results = ({searchString, results}) =>
  searchString.length ? (
    results ? (
      <Flex
        flexDirection="column"
        width={['100%', '50vw']}
        alignItems="stretch">
        <Box bg="green">
          <Text textAlign="right" fontSize={2} p={1}>
            Total results for {searchString}: {results.totalCount}
          </Text>
        </Box>
        <Box>
          {results.items.map(result => (
            <Result key={result.id} {...result} />
          ))}
        </Box>
      </Flex>
    ) : (
      <Text>Loading</Text>
    )
  ) : (
    <Text>Please search for a repository name</Text>
  );

export default Results;
