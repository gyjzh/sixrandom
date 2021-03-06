
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,Keyboard,View,Button, TextInput,TouchableOpacity, Text,ListView,TouchableWithoutFeedback,Switch} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import StorageModule from './StorageModule'
import ValueTypeModule from './ValueTypeModule'
import SixrandomModule from './SixrandomModule'
import Picker from 'react-native-picker';
//import DatePicker from 'react-native-datepicker'
//import DateTimePicker from 'react-native-modal-datetime-picker';
import { RadioButtons } from 'react-native-radio-buttons'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import FloatLabelTextInput from 'react-native-floating-label-text-input'


class EightrandomNewPage extends React.Component {

  constructor(porp) {
    
        super(porp);
        this.state= {
          isDatePickerVisible: false,
          isTimePickerVisible: false,
            switchstate:true,
            selectedValue: '男',
            datepicker:"",
            datepickershow:"",
            timepicker:"",
            Tip: ""
    }
   
  }

  
 
  _showTimePicker() {
    let years = [],
        months = [],
        days = [],
        hours = [],
        minutes = [];

    for(let i=1;i<101;i++){
        years.push(i+1930);
    }
    for(let i=1;i<13;i++){
        months.push(i);
    }
    for(let i=1;i<24;i++){
      hours.push(i);
  }
    for(let i=1;i<32;i++){
        days.push(i);
    }
    /*
    for(let i=1;i<61;i++){
        minutes.push(i);
    }
    */
    let pickerData = [years, months, days, hours];
    let date = new Date();
    let selectedValue = [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate(),
        date.getHours(),
        //date.getMinutes()
    ];
    Picker.init({
        isLoop:true,
        pickerData,
        selectedValue,
        pickerConfirmBtnText:'选择',
        pickerCancelBtnText:'取消',
        pickerTitleText: '日期',
        wheelFlex: [2, 1, 1, 2],
        onPickerConfirm: pickedValue => {
            console.log('onPickerConfirm', pickedValue);
            var t = new Date()
            t.setFullYear(pickedValue[0]);
            t.setMonth(pickedValue[1]-1);
            t.setDate(pickedValue[2]);
            t.setHours(pickedValue[3]);

            var selecttime = new Date()
            selecttime = t;
            console.log(selecttime.toLocaleString());
            this.setState({datepickershow:selecttime.toLocaleString()})
            this.setState({datepicker:selecttime})
        },
        onPickerCancel: pickedValue => {
            console.log('onPickerCancel', pickedValue);
        },
        onPickerSelect: pickedValue => {
            console.log("pickerData",pickerData[2]);
            let targetValue = [...pickedValue];
            
            if(parseInt(targetValue[1]) === 2){
                if(targetValue[0]%4 === 0 && targetValue[2] > 29){
                    targetValue[2] = 29;
                }
                else if(targetValue[0]%4 !== 0 && targetValue[2] > 28){
                    targetValue[2] = 28;
                }
            }
            else if(targetValue[1] in {4:1, 6:1, 9:1, 11:1} && targetValue[2] > 30){
                targetValue[2] = 30;   
            }
            // forbidden some value such as some 2.29, 4.31, 6.31...
            if(JSON.stringify(targetValue) !== JSON.stringify(pickedValue)){
                // android will return String all the time，but we put Number into picker at first
                // so we need to convert them to Number again
                targetValue.map((v, k) => {
                    if(k !== 3){
                        targetValue[k] = parseInt(v);
                    }
                });
                Picker.select(targetValue);
                pickedValue = targetValue;
            }
        }
    });
    Picker.show();
}


_toggle() {
  Picker.toggle();
}


  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    //headerRight:(<Button title="返回" />),
    return{
    headerRight:(<Button title="八字历史" onPress={  () => navigate('EightrandomHistoryPage')  }/>),
    title: '八字排盘',
    }
    
  };


  onSelect(index, value){
    this.setState({
      selectedValue:value
    })
  }

  //获取value值调用的方法
  getValue(text) {
        var value = text;
        this.setState({
            show: true,
            value: value
        });
    }

    //隐藏
    hide(val){
        this.setState({
            show: false,
            value: val
        });
    }

  render()
  {
    const { navigate } = this.props.navigation;


    
  
    //alert(ValueTypeModule["emotion"])
    return (
        <View style={styles.container}>
        
            <View style={styles.inputname}> 
                <Text style={styles.bottonstylewithfont}>姓名:</Text>  
                <TextInput style = {styles.input} 
                                   returnKeyType = "done"
                                   placeholder= "陈长生"
                                   onSubmitEditing={Keyboard.dismiss} 
                                   onChangeText = {(text) => this.setState({Tip:text})}/>
            </View>
            <View style={styles.inputname}> 
                <TouchableOpacity onPress={this._showTimePicker.bind(this)}>
                    <Text style={styles.bottonstylewithfont}>时间:</Text>
                </TouchableOpacity>
                <Text style = {styles.input} >{this.state.datepickershow}</Text>
            </View>
            <View style={styles.inputname}>
                <Text style={styles.bottonstylewithfont}>性别:</Text> 
                <Text style={styles.bottonstylewithfont}>{this.state.selectedValue}</Text>
                <Switch  style={styles.buttonstyle}
                onValueChange={(value) =>this.setState({switchstate: value,selectedValue:false==value?"女":"男"})}  
                value={this.state.switchstate}/>  
            </View>
            <View style={styles.inputbutton}>
            <Button
                onPress={()=>this.bazipaipan()}
                title="八字排盘"
        
            />
            </View>
            {/*}
            <TabNavigator 
       tabBarStyle={{ height: 40 }}
       sceneStyle={{ paddingBottom: 30 }}>  
                  <TabNavigator.Item
                        title="八字历史"  
                        onPress={() => navigate('EightrandomHistoryPage')}  
                        titleStyle={styles.menufont}>  
                    </TabNavigator.Item>  
                </TabNavigator>  
    */}
            
        </View> 
            )
    }
    bazipaipan()
    {
      var dataArray = [];
      dataArray["date"] = this.state.datepicker;
      //alert(dataArray["date"])
      dataArray["sex"]  = this.state.selectedValue;
      dataArray["name"] = this.state.Tip
      //alert(this.state.Tip)
      if(undefined==dataArray["date"] || ""==dataArray["date"])
      {
        dataArray["date"] = new Date()
      }
      var myDate=new Date(dataArray["date"])
      console.log(myDate)
      //alert(myDate)
      var EightDate = SixrandomModule.lunar_f(myDate)

      //console.log(EightDate.gzYear)
      //console.log(EightDate.gzMonth)
      //console.log(EightDate.gzDate)
      //console.log(EightDate.gzTime)



      

      

      var index = (new Date()).valueOf().toString();
      var savedate = new Array()
      savedate[0] = index;
      savedate[1] = EightDate.gzYear+EightDate.gzMonth +EightDate.gzDate +EightDate.gzTime;
      if('男'==this.state.selectedValue)
      {
        savedate[2] = '乾造'
      }
      else
      {
        savedate[2] = '坤造'
      }
      savedate[3]= ""+this.state.Tip
      savedate[4]=myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDay()+":"+myDate.getHours();
      console.log(savedate[3])
      var parameter = "?EightDate="+savedate[1] + "&sex=" + savedate[2]
      StorageModule.save({key:"name",id:index,data:savedate})
      StorageModule.save({key:"lastname",data:savedate})
      this.props.navigation.navigate('EightrandomMainPage',parameter)
    }
  begin(pagename)
    {
      const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({ routeName: pagename}),
          ]
        })
        this.props.navigation.dispatch(resetAction)
    }
}

var styles = StyleSheet.create ({

  input:{
    width:300,
    height:30,
    borderWidth:1,
    //marginLeft: 5,
    //paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4,
    //fontSize:15,
    alignItems:'center',
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
  container: {
    flex:1,
    
  },
  inputname: {
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    alignItems:'center',
    justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 30,
  },
  inputbutton: {
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    alignItems:'center',
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 30,
  },
  buttonstyle:{
    justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    alignItems:'baseline',
  },
  bottonstylewithfont:{
    justifyContent: 'space-between', //虽然样式中设置了 justifyContent: 'center'，但无效  
    alignItems:'baseline',
    fontSize:18
  }
});
module.exports=EightrandomNewPage;  