export const ADD_TO_VISITED = 'ADD_TO_VISITED';

export const addToVisited = (visitedItem) => ({
  type: ADD_TO_VISITED,
  payload: visitedItem,
});
