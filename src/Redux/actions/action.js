import {
  ADD_TODO,
  DELETE_ITEM,
  COMPLETE_ITEM,
  FILTER_ITEM
} from "./actionType.js";

let todoid = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: todoid++,
    content,
    completed: false
  }
});

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  payload: {
    index
  }
});

export const completeItem = (index, isComplete) => ({
  type: COMPLETE_ITEM,
  payload: {
    index,
    isComplete
  }
});

export const filterItem = (string) => ({
  type: FILTER_ITEM,
  payload: {
    string
  }
});
