import planetAPI from '../services/planetApi';

export const SEARCH_BEGIN = 'SEARCH_BEGIN';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const searchBegin = () => ({ type: SEARCH_BEGIN, loading: true });

export const searchSuccess = (data) => ({
  type: SEARCH_SUCCESS,
  loading: false,
  data,
});

export const searchFailure = (error) => ({
  type: SEARCH_ERROR,
  loading: false,
  error,
});

export function fetchPlanet() {
  return (dispatch) => {
    dispatch(searchBegin());
    return planetAPI().then(
      (data) => dispatch(searchSuccess(data.results)),
      (error) => dispatch(searchFailure(error.message)),
    );
  };
}
