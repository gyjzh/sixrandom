
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,View, Text,Button,TouchableOpacity,RefreshControl,ScrollView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

import EightrandomHistoryPage from './SixrandomHistoryPage';
import StorageModule from './StorageModule'
import EightrandomNewPage from './SixrandomNewPage';
import EightrandomFullInfoPage from './SixrandomFullInfoPage';
import ShareModule from './ShareModule'
import SixrandomModule from './SixrandomModule'
import ValueTypeModule from './ValueTypeModule'
import EightrandomModule from './EightrandomModule'

const {width, height} = Dimensions.get('window');  

var jump = false

/*
八字要展现的东西就比较多了
1、公立生日
2、生肖
3、星座
4、农历生日
5、命卦
6、姓名，性别
7、八字盘
8、地势
9、纳音
10、节气
11、大运
12、排大运
13、流年小运
14、四柱神煞
15、五行力量分析
16、日柱分析
17、八字婚姻
18、日柱分析
19、六亲
20、事业
21、健康
22、运势太岁关系
*/



class EightrandomMainPage extends React.Component {
  constructor(props) {

  super(props);

    var sex = ""
    var EightDate = ""
    var buildeight = new Array();
    var buildeightExt = new Array();
    var precent = new Array();
    var daykey = new Array();
    var relationshipday = ""
    var relationshipearth = ""
    //var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      //dataSource: dataSource,
      sex:sex,
      EightDate:EightDate,
      buildeight:buildeight,
      buildeightExt:buildeightExt,
      precent:precent,
      daykey:daykey,
      relationshipday:relationshipday,
      relationshipearth:relationshipearth,
		};
    };

  componentDidMount() {
    
		this.timer = setTimeout(
			() => {
        this.refreshlist()
        
			},
			200
    );
     
  }

  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    return{
    //headerLeft:(<Button title="万年历" onPress={  () => navigate('MainPage')  }/>),
    //headerRight:(<Button title="历史" onPress={  () => navigate('HistoryPage')  }/>),
    title: '八字分析',
    }
  };

 
  

  refreshlist()
  {
      const { navigate } = this.props.navigation;
      
      var parameter = this.props.navigation.state.params

      
      if(undefined!=parameter)
      {
        var info = null;
        
        var ret;
        var args = {};
            var match = null;
            var search = decodeURIComponent(parameter.substring(1));
            var reg = /(?:([^&]+)=([^&]+))/g;
            while((match = reg.exec(search))!==null){
                args[match[1]] = match[2];
            }
        info = args
        console.log(info.EightDate);
        console.log(info.sex);
        this.setState({  
        //  dataSource: this.state.dataSource.cloneWithRows(info.EightDate),
            sex:info.sex,EightDate:info.EightDate }); 
            this.buildeight();
      }
      else
      {
        StorageModule.load({
            key:"lastname",
        }).then(ret => {
       
              //return

              this.setState({  
                //dataSource: this.state.dataSource.cloneWithRows(ret.EightDate),
                sex:ret.sex,EightDate:ret.EightDate }); 
            }).catch(err => {
            //alert(err)
            if(false==jump)
            {
               this.begin('EightrandomNewPage')
               jump = true
            }
        })
      }
  }

   _renderRow(rowData) {
    //alert(rowData.name)
    return (
      
      <View style={styles.list}>
        <Text  style={styles.rowhigth}>{rowData}</Text>
      </View>
    );
  }
  buildeight()
  {
    var buildeight = new Array()
    buildeight[0] = EightrandomModule.parentday(this.state.EightDate[0],this.state.EightDate[4])
    buildeight[2] = EightrandomModule.parentday(this.state.EightDate[2],this.state.EightDate[4])
    buildeight[4] = "元"//this.parentday(this.state.EightDate[4],this.state.EightDate[4])
    buildeight[6] = EightrandomModule.parentday(this.state.EightDate[6],this.state.EightDate[4])
    buildeight[1] = EightrandomModule.parentearth(this.state.EightDate[1],this.state.EightDate[4])
    buildeight[3] = EightrandomModule.parentearth(this.state.EightDate[3],this.state.EightDate[4])
    buildeight[5] = EightrandomModule.parentearth(this.state.EightDate[5],this.state.EightDate[4])
    buildeight[7] = EightrandomModule.parentearth(this.state.EightDate[7],this.state.EightDate[4])
    var buildeightExt = new Array()
    buildeightExt[0] = EightrandomModule.gethide(this.state.EightDate[1]);
    buildeightExt[2] = EightrandomModule.gethide(this.state.EightDate[3]);
    buildeightExt[4] = EightrandomModule.gethide(this.state.EightDate[5]);
    buildeightExt[6] = EightrandomModule.gethide(this.state.EightDate[7]);
    buildeightExt[1] = EightrandomModule.gethideshishen(buildeightExt[0],this.state.EightDate[4]);
    buildeightExt[3] = EightrandomModule.gethideshishen(buildeightExt[2],this.state.EightDate[4]);
    buildeightExt[5] = EightrandomModule.gethideshishen(buildeightExt[4],this.state.EightDate[4]);
    buildeightExt[7] = EightrandomModule.gethideshishen(buildeightExt[6],this.state.EightDate[4]);
    var precent = new Array();
    var daykey = new Array();
    var o = EightrandomModule.getfive(this.state.EightDate)
    precent = o.q
    daykey = o.p
    var r = EightrandomModule.getrelationship(this.state.EightDate)
    var relationshipday = r.dr
    var relationshipearth = r.er
    console.log(r)
    this.setState({  
      buildeight:buildeight, buildeightExt:buildeightExt,
      daykey:daykey,precent:precent,
      relationshipday:relationshipday,
      relationshipearth:relationshipearth}); 
  }
  
  render(){
      const { navigate } = this.props.navigation;
      
      jump = false;
      
        return(
    <ScrollView style={styles.container}>

        

           <View style={styles.bottonstylewithfont}> 

           <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>{this.state.sex}</Text>
              </View>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>令</Text>
              <Text style={styles.Eightstylewithfont}>年</Text>
              <Text style={styles.Eightstylewithfont}>月</Text>
              <Text style={styles.Eightstylewithfont}>日</Text>
              <Text style={styles.Eightstylewithfont}>时</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>亲</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[0]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[2]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[4]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[6]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>干</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[0]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[2]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[4]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[6]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>支</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[1]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[3]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[5]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[7]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text style={styles.Eightstylewithfont}>亲</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[1]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[3]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[5]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[7]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>藏</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[0]}</Text>

              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[2]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[4]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[6]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>亲</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[1]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[3]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[5]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[7]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>木</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>火</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>土</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>金</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>水</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>{this.state.precent[0]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.precent[1]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>{this.state.precent[2]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>{this.state.precent[3]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>{this.state.precent[4]}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'green'}]}>{this.state.precent[5]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.precent[6]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'brown'}]}>{this.state.precent[7]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'gold'}]}>{this.state.precent[8]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'blue'}]}>{this.state.precent[9]}%</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>甲:{this.state.daykey['甲']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>丙:{this.state.daykey['丙']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>戊:{this.state.daykey['戊']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>庚:{this.state.daykey['庚']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>壬:{this.state.daykey['壬']}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>乙:{this.state.daykey['乙']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>丁:{this.state.daykey['丁']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>己:{this.state.daykey['己']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>辛:{this.state.daykey['辛']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>癸:{this.state.daykey['癸']}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.relationshipday}</Text>
              </View>
              <View style={styles.Eightstyleline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.relationshipearth}</Text>
              </View>
      
                 
              </ScrollView>  
    )
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

   
  };


    




var styles = StyleSheet.create ({
  container: {
    flex:1,
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
 rowhigth:{
    lineHeight:25,
  },
  list:{
    height:30,
    //borderWidth:1,
    marginLeft: 1,
    paddingLeft:1,
    //borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    //textAlign:'center', 
    //textDecorationLine:'underline'
    flexWrap:'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textbutton:{
    textAlign:'center', 
  },
   button:{
    height: 50,
    //width: 50,
    backgroundColor:'transparent',
   justifyContent:'center',
   borderRadius: 4,
    },
  tabBarStyle:{
    flex: 1,
    height:40,
    flex:1
  },
  Eightstylewithfont:{
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //alignItems:'center',
    fontSize:18
  },
  Eightstylewithfontmultline:{
    width:40,
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //alignItems:'center',
    fontSize:18
  },
  Eightstyleline: {
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    //alignItems:'center',
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //justifyContent:'space-between',
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 30,
  },
});
module.exports=EightrandomMainPage;  