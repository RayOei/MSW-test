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
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.debug(`Error with getMovies: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const getFakeMovies = async () => {
    try {
      const response = await fetch('https://fake_reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.debug(`Error with getFakeMovies: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  const resetMovies = async () => {
    try {
      let resetJson = {
        title: 'The Basics - Networking',
        description: 'Your app fetched this from a TEST endpoint!',
        movies: [
          {id: '1', title: 'Nada', releaseYear: '1970'},
          {id: '2', title: 'Niets', releaseYear: '1970'},
          {id: '3', title: 'Leeg', releaseYear: '1970'},
          {id: '4', title: 'Onbekend', releaseYear: '1970'},
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
            title="Reset"
            color="green"
          />
          <Button
            onPress={() => getFakeMovies()}
            testID="ververs"
            title="Refresh"
            color="red"
          />
          <Button
            onPress={() => resetMovies()}
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
