import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, Button, View} from 'react-native';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);
  console.log('......reload APP.......');

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      if (response.ok) {
        const json = await response.json();
        setData(json.movies);
      } else {
        let resetJson = {
          title: 'Error received',
          description: 'Error reveived from real endpoint call!',
          movies: [
            {
              id: '1',
              title: `${(await response.text()).toString()}`,
              releaseYear: `${response.status}`,
            },
          ],
        };
        setData(resetJson.movies);
      }
    } catch (error) {
      console.debug(`Error with getMovies: ${error}`);
      let resetJson = {
        title: 'Nothing received',
        description: 'Nothing reveived from real endpoint call!',
        movies: [
          {
            id: '1',
            title: 'ERROR REVEIVED from real endpoint call',
            releaseYear: '1xxx',
          },
          {
            id: '2',
            title: 'EXPECTED response from handler',
            releaseYear: '1xxx',
          },
        ],
      };
      setData(resetJson.movies);
    } finally {
      setLoading(false);
    }
  };
  const getFakeMovies = async () => {
    try {
      const response = await fetch('https://fake_reactnative.dev/movies.json');
      if (response.ok) {
        const json = await response.json();
        setData(json.movies);
      } else {
        let resetJson = {
          title: 'Error received',
          description: 'Error reveived from fake endpoint call!',
          movies: [
            {
              id: '1',
              title: `${(await response.text()).toString()}`,
              releaseYear: `${response.status}`,
            },
          ],
        };
        setData(resetJson.movies);
      }
    } catch (error) {
      console.debug(`Error with getFakeMovies: ${error}`);
      let resetJson = {
        title: 'Nothing received',
        description: 'Nothing reveived from fake endpoint call!',
        movies: [
          {
            id: '1',
            title: 'ERROR REVEIVED from fake call',
            releaseYear: '2xxx',
          },
          {
            id: '2',
            title: 'EXPECTED response from handler',
            releaseYear: '2xxx',
          },
        ],
      };
      setData(resetJson.movies);
    } finally {
      setLoading(false);
    }
  };
  const clearMovies = async () => {
    try {
      let resetJson = {
        title: 'The Basics - Networking',
        description: 'Your app fetched this from a TEST endpoint!',
        movies: [
          {id: '1', title: 'Cleaned', releaseYear: ''},
          {id: '2', title: 'No call', releaseYear: ''},
          {id: '3', title: 'to', releaseYear: ''},
          {id: '4', title: 'Endpoint', releaseYear: ''},
        ],
      };
      setData(resetJson.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFakeMovies();
  }, []);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'yellow',
        flex: 0.3,
        padding: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 75,
        borderStartEndRadius: 1000,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <Text testID={`item-${item.id}`}>
                {item.title}, {item.releaseYear}
              </Text>
            )}
          />
          <Button
            onPress={() => getMovies()}
            testID="reset"
            title="GetMovies"
            color="green"
          />
          <Button
            onPress={() => getFakeMovies()}
            testID="ververs"
            title="GetFakeMovies"
            color="red"
          />
          <Button
            onPress={() => clearMovies()}
            testID="clear"
            title="Clear"
            color="blue"
          />
        </>
      )}
    </View>
  );
};

export default App;
