
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,View,TouchableOpacity,Alert,Button, Text,RefreshControl,ScrollView,ListView} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import { StackNavigator } from 'react-navigation';

import StorageModule from './StorageModule'
import ValueTypeModule from './ValueTypeModule'
import SixrandomModule from './SixrandomModule'



class MyPage extends React.Component {
   constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isLoading: false,
			dataSource: dataSource,
		};
  }


  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    return{
    //headerLeft:(<Button title="万年历" onPress={  () => navigate('MainPage')  }/>),
    //headerRight:(<Button title="善易者不卜" onPress={  () => navigate('MyStoryPage')  }/>),
    title: '我的',
    }
  };

  render()
  {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.index}>

          </Text>
       
          <Text style={styles.index}>
          </Text>
          <Text style={styles.index}>
          北京大道易德文化传媒有限公司
          </Text>
          <Text style={styles.index}>
          </Text>
          <Text style={styles.index}>
          我们专注于
          </Text>
          <Text style={styles.index}>
          </Text>
       
          
          <Text style={styles.index}>
          1、国学易经研究
          </Text>
          <Text style={styles.index}>
          2、易经健康研究
          </Text>
          <Text style={styles.index}>
          3、八字六爻研究
          </Text>
          <Text style={styles.index}>
          4、情感心理咨询
          </Text>
          <Text style={styles.index}>

          </Text>
          <Text style={styles.index}>
          咨询地址：北京市东城区雍和宫大街41号
          </Text>
          <Text style={styles.index}>
          </Text>
          <Text style={styles.index}>
          咨询电话：13391909968 郑语斐
          </Text>

          <TabNavigator 
       tabBarStyle={{ height: 40 }}
       sceneStyle={{ paddingBottom: 30 }}>  
                  
                    <TabNavigator.Item 
                        title="六爻历史"  
                        //selected={this.state.tab=='history'}   
                        onPress={ 
                            () => navigate('SixrandomHistoryPage',this.state.parameter)
                          }titleStyle={styles.menufont}>  
                        
                    </TabNavigator.Item>  
                    <TabNavigator.Item 
                        title="八字历史"  
                        //selected={this.state.tab=='history'}   
                        onPress={ 
                            () => navigate('EightrandomHistoryPage',this.state.parameter)
                          }titleStyle={styles.menufont}>  
                        
                    </TabNavigator.Item>  
                   
                </TabNavigator>  
        </View>
					)
  }

}

var styles = StyleSheet.create ({
  container: {
    flex:1,
    //textAlign:'center',     
    //justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    //alignItems: 'center',
    //lineHeight:45,     //行高  
    //fontSize:15
  },
  index:
  {
    lineHeight:24,
    //marginLeft: 10,
    //paddingLeft:10,
    textAlign:'center', 
    fontSize:15,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    alignItems: 'center',
  },

  list:{
    height:45,
    //borderWidth:1,
    marginLeft: 10,
    paddingLeft:10,
    //borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    //textAlign:'center', 
    //textDecorationLine:'underline'
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
    vb_text: {  
    color: '#333333',  
    fontFamily: 'Times',  
    margin: 10,  
    fontSize: 12,         
    textAlign: 'auto',  
    lineHeight: 22,     //行高  
    fontStyle: 'italic',    //设置文字：normal：正常体；italic：斜体  
    fontWeight: 'bold', //设置粗体字，'normal' /*default*/, 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'  
    textDecorationLine: 'underline line-through',//下划线和删除线的样式：['none' /*default*/, 'underline', 'line-through', 'underline line-through'  
  },
});
module.exports=MyPage;  