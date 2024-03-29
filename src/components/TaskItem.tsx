import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { ItemWrapper } from './ItemWrapper'
import { Task } from './TasksList'
import trashIcon from '../assets/icons/trash/trash.png'
import closeIcon from '../assets/icons/close/close.png'
import penIcon from '../assets/icons/pen/pen.png'

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  item: Task;
  index: number;
}

export function TaskItem({toggleTaskDone, editTask, removeTask, item, index}: TaskItemProps) {

  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, title);
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  style={[styles.taskMarker, item.done && styles.taskMarkerDone]}
                  //TODO - use style prop 
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  editable={isEditing}
                  onSubmitEditing={handleSubmitEditing}
                  style={item.done ? styles.taskTextDone : styles.taskText}
                  ref={textInputRef}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
              { isEditing ? (
                <TouchableOpacity
                onPress={handleCancelEditing}
              >
                <Image source={closeIcon} />
              </TouchableOpacity>
              )
              : (
                <TouchableOpacity
                  onPress={handleStartEditing}
                >
                  <Image source={penIcon} />
                </TouchableOpacity>
                
                )
              }

              <View style={styles.iconsSpacing} />

              <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={() => removeTask(item.id)}
                disabled={isEditing}
                //TODO - use onPress (remove task) prop
              >
                <Image source={trashIcon} />
              </TouchableOpacity>
            </View>

            
          </ItemWrapper>
  )
}


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsSpacing: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginLeft: 24,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})