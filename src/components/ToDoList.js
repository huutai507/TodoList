import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodo, deleteItem, completeItem } from "../Redux/actions/action";
import classNames from "classnames";
import styles from "./todolist.module.css";
import useLocalStorage from "../hooks/useLocalStorage";

function ToDoList({ todoList, addTodo, deleteItem, completeItem }) {
  const [input, setInput] = useState("");
  const [allItems, setAllItems] = useLocalStorage("allItems");
  // const [completeItems, setCompleteItems] = useState([]);
  // const [unCompletedItems, setUncompletedItems] = useState([]);
  const [selected, setSelected] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddToDo = (e) => {
    if (e.charCode === 13) {
      input && addTodo(input);
      setInput("");
    }
  };

  const handleClickAddToDo = (e) => {
    input && addTodo(input);
    setInput("");
  };

  const handleDeleteItem = (index) => {
    deleteItem(index);
  };

  // const handleAllItem = () => {};
  const handleCompleteItem = (index, isComplete) => {
    completeItem(index, isComplete);
  };
  // const handleUnCompleteItem = () => {};

  const handleFilterItem = (selected) => {
    setSelected(selected);
  };

  useEffect(() => {
    switch (selected) {
      case "all":
        // setCompleteItems([]);
        // setUncompletedItems([]);
        setAllItems(todoList);
        break;
      case "complete":
        setAllItems(todoList.filter((item) => item.completed));
        // setCompleteItems(todoList.filter((item) => item.completed));
        // setAllItems([]);
        // setUncompletedItems([]);
        break;
      case "uncompleted":
        setAllItems(todoList.filter((item) => !item.completed));
        // setUncompletedItems(todoList.filter((item) => !item.completed));
        // setAllItems([]);
        // setCompleteItems([]);
        break;
      default:
        setAllItems(todoList);
    }
  }, [todoList, selected]);

  return (
    <div className={styles.app}>
      <div className={styles.app__title}>TO DO APP</div>
      <div className={styles.app__todo}>
        <div className={styles.app__input}>
          <input
            onChange={handleChange}
            placeholder="What needs to be done ?"
            value={input}
            onKeyPress={handleAddToDo}
          ></input>

          <ol className={styles.app__list_item}>
            {allItems &&
              allItems.map((item, index) => (
                <li key={index}>
                  <div className={styles.app__list_item_info}>
                    <div
                      className={classNames({
                        [styles.complete]: item.completed
                      })}
                      onClick={() => handleCompleteItem(index, item.completed)}
                    >
                      {item.content}
                    </div>
                    <div onClick={() => handleDeleteItem(index)}>
                      <i
                        className="far fa-trash-alt"
                        style={{ color: "#fd574c" }}
                      ></i>
                    </div>
                  </div>
                </li>
              ))}
            {/* {completeItems &&
              completeItems.map((item, index) => (
                <li key={index}>
                  <div className={styles.app__list_item_info}>
                    <div
                      className={classNames({
                        [styles.complete]: item.completed
                      })}
                      onClick={() => handleCompleteItem(index, item.completed)}
                    >
                      {item.content}
                    </div>
                    <div onClick={() => handleDeleteItem(index)}>
                      <i
                        className="far fa-trash-alt"
                        style={{ color: "#fd574c" }}
                      ></i>
                    </div>
                  </div>
                </li>
              ))}
            {unCompletedItems &&
              unCompletedItems.map((item, index) => (
                <li key={index}>
                  <div className={styles.app__list_item_info}>
                    <div
                      className={classNames({
                        [styles.complete]: item.completed
                      })}
                      onClick={() => handleCompleteItem(index, item.completed)}
                    >
                      {item.content}
                    </div>
                    <div onClick={() => handleDeleteItem(index)}>
                      <i
                        className="far fa-trash-alt"
                        style={{ color: "#fd574c" }}
                      ></i>
                    </div>
                  </div>
                </li>
              ))} */}
          </ol>
        </div>
        <div className={styles.btn__filter}>
          <button className={styles.btn} onClick={() => handleClickAddToDo()}>
            ADD TO DO
          </button>
          <button
            className={styles.btn}
            onClick={() => handleFilterItem("all")}
            style={{ marginLeft: "10px" }}
          >
            ALL
          </button>
          <button
            className={styles.btn}
            onClick={() => handleFilterItem("complete")}
            style={{ marginLeft: "10px" }}
          >
            COMPLETE
          </button>
          <button
            className={styles.btn}
            onClick={() => handleFilterItem("uncompleted")}
            style={{ marginLeft: "10px" }}
          >
            UNCOMPLETED
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { todoList: state.todos.content };
};

export default connect(mapStateToProps, {
  addTodo,
  deleteItem,
  completeItem
})(ToDoList);
