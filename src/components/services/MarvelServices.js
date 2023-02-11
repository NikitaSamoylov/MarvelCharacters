class MarvelServices {
  // _apiBase = '//gateway.marvel.com:443/v1/public/';
  // _apiKey = '3a6335c39ffb5fd99f85eff0ff2034e4';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'd77836f381f58d6b410b0d5931078cee';

  getResourses = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error('error');
    }
    return res.json();
  };
  getAllCharacters = async () => {
    const res = await this.getResourses(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResourses(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description:
        char.description.length === 0
          ? 'The character has not any description'
          : `${char.description.slice(0, 205)} ...`,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}
export default MarvelServices;
