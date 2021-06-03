import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=4d9dd0f"
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search
      // console.log(results)
      setState(prevState => {
        return { ...prevState, results:results }
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Detector</Text>
      <TextInput
        style={styles.searchbox}
        placeholder={'Enter a movie...'}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        { state.results.map(result => (
          <View key={result.imdbID} style={styles.result}>
            <Image
              source={{ uri: result.Poster }}
              style={{
                width: '100%',
                height: 300
              }}
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
        )) }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchbox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 40
  },
  results: {
    flex: 1,
    marginBottom: 30
  },
  result: {
    flex: 1,
    marginBottom: 20,
    width: '100%'
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  }
});
