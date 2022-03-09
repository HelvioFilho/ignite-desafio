import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    if (tasks.findIndex(task => { return task.title === newTaskTitle }) === -1) {
      const task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(old => [...old, task]);
    } else {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome!");
    }
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const index = tasks.findIndex(task => { return task.id === taskId });
    const updatedTasks = tasks.map(task => ({ ...task }));
    updatedTasks[index].title = taskNewTitle;
    setTasks(updatedTasks);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const index = tasks.findIndex(task => { return task.id === id });
    const updatedTasks = tasks.map(task => ({ ...task }));
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "NÃO",
          style: "cancel",
        },
        {
          text: "SIM",
          onPress: () => setTasks(old => old.filter(task => task.id !== id)),
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})