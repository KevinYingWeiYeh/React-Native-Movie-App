

  export const fetchGeners = function() {
  	console.log('FETCH!!!!!!!!!!!!')
    var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=cc79bee81cab976b941237e667cd8bdd&language=en-U'
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var data = responseJson.genres
        var genres = {}
        genres = data.reduce((a,e) => {
          a[e.id] = e.name;
          return a;
        },{})
        this.setState({
          genres : genres
        })
      })
      .catch((err) => console.log('err',err))
  }