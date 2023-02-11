import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../services/MarvelServices';
import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    isLoading: true,
    error: false,
  };

  marvelService = new MarvelServices();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      isLoading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      isLoading: false,
    });
  };

  // Этот метод создан для оптимизации,
  // чтобы не помещать такую конструкцию в метод render
  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, isLoading, error } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
