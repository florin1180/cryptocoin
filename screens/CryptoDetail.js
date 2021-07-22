import react from 'react';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';

import { VictoryScatter, VictoryLine, VictoryChart, VictoryAxis } from "victory-native"

import { VictoryCustomTheme } from '../styles'

import { HeaderBar, CurrencyLabel } from '../components';

import { dummyData, COLORS, SIZES, FONTS, icons } from '../constants';

const CryptoDetail = ({ route, navigation }) => {
    
    const [selectedCurrency, setSelectedCurrency] = React.useState(null)

    React.useEffect(() => {
        const {currency} = route.params
        setSelectedCurrency(currency)
    }, [])

    return (
        <View 
            style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.radius,
                alignItems:'center',
                borderRadius:SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
            >
                <View 
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.padding,
                        paddingHorizontal:SIZES.padding
                    }}
                >
                    <View style={{flex:1}}>
                        <CurrencyLabel
                            icon={selectedCurrency?.image}
                            currency={selectedCurrency?.currency}
                            code={selectedCurrency?.code}
                        />
                    </View>

                    <View>
                        <Text style={{...FONTS.h3}}>${selectedCurrency?.amount}</Text>
                        <Text style={{color:selectedCurrency?.type == "I" ? COLORS.green : COLORS.red, ...FONTS.body3}}>{selectedCurrency?.changes}</Text>
                    </View>

                </View>

                <View
                    style={{
                        marginTop: -25
                    }}
                >
                    <VictoryChart
                        theme={VictoryCustomTheme}
                        height={220}
                        width={SIZES.width - 40}
                    >
                        <VictoryLine
                            style={{
                                data:{
                                    stroke:COLORS.secondary
                                },
                                parent:{
                                    border:"1px solid #ccc"
                                }
                            }}
                            data={selectedCurrency?.charData}
                            categories={{
                                x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                                y: ["15", "30", "45"]
                            }}
                        />
                        <VictoryScatter
                            data={selectedCurrency?.charData}
                            size={7}
                            style={{
                                data:{
                                    fill:COLORS.secondary
                                }
                            }}
                        />

                    </VictoryChart>
                </View>

            </View>

        </View>
    )


    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:COLORS.lightGray1
            }}
        >
            <HeaderBar right={true}/>

            <ScrollView>
                <View style={{flex:1, paddingBottom:SIZES.padding}}>
                    {renderChart()}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default CryptoDetail;