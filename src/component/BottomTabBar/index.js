import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';

export default class BottomTabBar extends React.Component {
    render() {
        const data = [{ key: 'PUNCH IN', number: '1', time: '10:30 AM', disable: false }, { key: 'MEAL IN', number: '2', time: '-- : --', disable: true }, { key: 'MEAL IN', number: '3', time: '-- : --', disable: true }, { key: 'MEAL OUT', number: '4', time: '-- : --', disable: true }];
        var punchingData = this.props.punchInList.Data.AvailableStatus;
        console.log(punchingData);
        // for (let i = 0 ; i < this.props.listItem.Data.CanApplylength ; i++){
        //     if()
        // }
        if(punchingData == null){
            return (
                <View>
                    </View>
            )
        }

        else{

        return (
            <View style={{ flexDirection: 'row', borderColor: '#888888', borderTopWidth: 1, borderStyle: 'solid' }}>
                {punchingData.map((item, i) =>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        borderRightWidth: 1, borderStyle: 'solid', borderColor: '#888888',
                        width: '25%', height: 50, backgroundColor: item.Disabled == "true" ? '#e6e6e6' : "#151515"
                    }}
                    key={i}
                    >

                        {item.Disabled == "true" ?
                            <View>
                                <View style={{ height: 25 }}>
                                    {/* <TouchableOpacity onPress={this.props.onPressTab} > */}
                                    <Text style={{ color: "#888888", textAlign: 'center' }}>{item.Text}</Text>
                                    {/* </TouchableOpacity> */}
                                </View>
                                <View style={{ height: 25 }}>
                                {item.Time == "" ?  <Text style={{ color: '#888888', textAlign: 'center' }}>{'-- : --'}</Text>
                                 : <Text style={{ color: '#888888', textAlign: 'center' }}>{item.Time}</Text>  }
                                </View>
                            </View> :
                            <View>
                                <TouchableOpacity onPress={() => this.props.onPressTab(item)} >
                                    <Text style={{ color: '#e6e6e6', textAlign: 'center', lineHeight: 45 }}>{item.Text}</Text>
                                </TouchableOpacity>
                            </View>

                        }

                    </View>
                )}

            </View>

            // <View style={{ width: '25%', height: 50, backgroundColor: '#e6e6e6',borderColor : '#ccc' , borderRightWidth : 1 , borderStyle: 'solid'  }}>
            //     <TouchableOpacity>
            //         <Text style = {{textAlign : 'center'}}>{'MEAL IN'}</Text>
            //     </TouchableOpacity>
            // </View>

            // <View style={{ width: '25%', height: 50, backgroundColor: '#e6e6e6' ,borderColor : '#ccc' , borderRightWidth : 1 , borderStyle: 'solid'}}>
            //     <TouchableOpacity>
            //         <Text style = {{textAlign : 'center'}}>{'MEAL OUT'}</Text>
            //     </TouchableOpacity>
            // </View>

            // <View style={{ width: '25%', height: 50, backgroundColor: '#e6e6e6' }}>
            //     <TouchableOpacity>
            //         <Text style = {{textAlign : 'center'}}>{'PUNCH OUT'}</Text>
            //     </TouchableOpacity>
            // </View>

        );
    }   
    }
}

BottomTabBar.propType = {
    text: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
};
