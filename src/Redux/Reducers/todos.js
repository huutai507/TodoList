import {
  ADD_TODO,
  DELETE_ITEM,
  COMPLETE_ITEM,
  FILTER_ITEM
} from "../actions/actionType";

const initialTodos = JSON.parse(localStorage.getItem("allItems"));
let initialStore;
initialTodos === null
  ? (initialStore = { content: [] })
  : (initialStore = { content: initialTodos });

export default function (state = initialStore, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content, completed } = action.payload;
      return {
        ...state,
        content: [...state.content, { id, content, completed }]
      };
    }
    case DELETE_ITEM: {
      const { index } = action.payload;
      return {
        ...state,
        content: [
          ...state.content.slice(0, index),
          ...state.content.slice(index + 1)
        ]
      };
    }
    case COMPLETE_ITEM: {
      const { index, isComplete } = action.payload;
      return {
        ...state,
        content: [
          ...state.content.slice(0, index),
          { ...state.content[index], completed: !isComplete },
          ...state.content.slice(index + 1)
        ]
      };
    }
    case FILTER_ITEM: {
      const { string } = action.payload;
      console.log("im string", string);
      if (string === "all") {
        return { content: [state.content] };
      } else if (string === "complete") {
        return {
          content: [state.content.filter((item) => item.completed)]
        };
      } else if (string === "uncompleted") {
        return {
          content: [state.content.filter((item) => !item.completed)]
        };
      }
      break;
    }

    default:
      return state;
  }
}
