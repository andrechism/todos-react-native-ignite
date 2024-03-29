import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleEditTask(taskId: number, taskNewTitle: string) {

    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.title = taskNewTitle
      }
      return task
    })

    setTasks(newTasks)
  }

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const hasTask = tasks.find(task => task.title === newTaskTitle);

    if (!!hasTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevState => [...prevState, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    // Alert.alert('teste')
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Não', onPress: () => {}},
        {text: 'Sim', onPress: () => {
          const newTasks = tasks.filter(task => task.id !== id)
          setTasks(newTasks)
        }}
      ]
      )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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