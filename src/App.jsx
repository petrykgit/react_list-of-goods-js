import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReversed) {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SORT_BY_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    case '':
    default:
      break;
  }

  if (isReversed) {
    return [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [primarySort, setPrimarySort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const isSorted = primarySort !== '' || isReversed;

  const goodsForWork = getPreparedGoods(
    goodsFromServer,
    primarySort,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${primarySort === SORT_BY_ALPHABET && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setPrimarySort(SORT_BY_ALPHABET);
            setIsReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${primarySort === SORT_BY_LENGTH && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setPrimarySort(SORT_BY_LENGTH);
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setPrimarySort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsForWork.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
