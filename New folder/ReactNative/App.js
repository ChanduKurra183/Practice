import React, { Component } from "react";  
import { StyleSheet, View, TextInput, Text, Button, Picker,ScrollView }  from "react-native";
import DatePicker from 'react-native-datepicker';
import { Table, Row } from 'react-native-table-component';
import { CheckBox } from 'react-native-elements';

class App extends Component { 

  constructor(props) {
    super(props);
    this.delTask = this.delTask.bind(this);
    this.isDone = this.isDone.bind(this);  
  }

  state = {  

    taskName : "",
    userTask : "",
    
    date : "",
	tableHead: ['S.No', 'Task Name', 'Due Date','IsDone','Action'],
    
    tasks : [],
	widthArr: [40, 120, 70, 70, 70]
  }
  
  userNameListChange = (inputText) => {  
    this.setState({ taskName: inputText })  
  } 
  
  userdateTextChange = (inputText) => {  
    this.setState({ userTask: inputText })  
  } 
  onChangetime = time => this.setState({ time })
  
  addTask = () => {  
    let tasks = this.state.tasks;
    tasks.push([this.state.taskName,this.state.date, false]);
    this.setState({ tasks: tasks });
    console.log(this.state.tasks);
    this.setState({taskName : "",date : ""});    
  } 

  delTask(index){
	  console.log(index);
	  let task_list = this.state.tasks;
	  task_list.splice(index, 1);
      this.setState({tasks: task_list});   
  }

  isDone(index){
    console.log(index);
    let task_list = this.state.tasks;
    task_list[index][2]=true;
    this.setState({tasks: task_list});
  }

  render() {   
	const data = [];
    for (let i = 0; i < this.state.tasks.length; i += 1) {
      const dataRow = [];
	  dataRow.push(i+1);
      dataRow.push(this.state.tasks[i][0]);
	  dataRow.push(this.state.tasks[i][1]);
    if(!this.state.tasks[i][2]){
      dataRow.push(<CheckBox
      center
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={this.state.tasks[i][2]}
      onPress={() => this.isDone(i)} 
      />)
    }
    else{
      dataRow.push("DONE")
    }
    
	  if(true){
		  dataRow.push(<Button  
				title="DEL"  
				color="red"  
				onPress={() => this.delTask(i)} 
		  /> );
     }
      
      data.push(dataRow);
    }
    return (  
      <ScrollView >
      <View style={styles.container}>  
        <Text style={styles.txtLogin}>TO DO List</Text>
        
        <TextInput
          style={styles.textInputStyle}  
          onChangeText={this.userNameListChange}
          value = {this.state.taskName}
          placeholder="Enter Task Name"  
          placeholderTextColor="black"  
        /> 
         
        <DatePicker
        style = {styles.textInputStyle}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({date: date})}}
      />
         
      <View style={{ margin: 25 }}>  
          <Button  
            title="ADD Task"  
            color="#3642ba"  
            onPress={this.addTask}
      /> 
      </View>
      </View>
      <View >
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
				<Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.head} textStyle={styles.text}/>
                {
                  data.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={this.state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
      </View> 
      </ScrollView>
    ); 
    }
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: "flex-start",  
    alignContent: "center",  
    margin:30, 
    backgroundColor: "white", 
       
  },  
  textInputStyle: {  
    borderColor: "black",  
    borderWidth: 1,  
    height: 50,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 5,  
    marginTop: 8,
    
    backgroundColor: "white",   
    
  },  
  txtLogin: {  
    
    fontWeight: "bold",  
    fontSize: 25,
    
    height: 50,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 5,  
    marginTop: 8,
    
    backgroundColor: "#8c8887", 
    textAlign:"center",
    margin : 5,
    
  },
 

  head: { 
    height: 50, 
    backgroundColor: 'yellow'
    
  },
  text: { 
    color:'blue',
    textAlign: 'center', 
    fontWeight: 'bold' 
  },

  row: { 
    height: 40 
  }  
}); 
  
export default App;  