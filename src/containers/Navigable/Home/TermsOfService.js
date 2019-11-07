
import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class TermsAndConditions extends Component{

  state = {
      accepted: false
  }
  _navigateToScreen = () => {
    const { navigation } = this.props.navigation.navigate('Settings');
  }

  render(){
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView 
            style={styles.tcContainer}
            onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  this.setState({
                      accepted: true
                  })
                }
              }}
            >
                <Text style={styles.tcP}>Welcome to Soci-a-bull. If you continue to browse and use this application, you are agreeing to comply with and be bound by the following terms and conditions of use, as well as the privacy policy, which govern Soci-a-bull’s relationship with you in relation to this application. If you disagree with any part of these terms and conditions, please delete your account.</Text>
                <Text style={styles.tcP}>The term ‘Soci-a-bull’ or ‘us’ or ‘we’ refers to the owner of the application. The term ‘you’ refers to the user or viewer of our application.</Text>
                    <Text style={styles.tcL}>{'\u2022'} The content of this application is for your general information and use only. It is subject to change without notice.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Individuals under the age of 18 are strictly prohibited from using this application. If a user is found to be, or suspected of being underage, their account may be terminated. Soci-a-bull does not knowlingly collect information from minors. Soci-a-bull releases all liability for actions caused by or to minors using our application.</Text>
                    <Text style={styles.tcL}>{'\u2022'} By Registering an account, you are giving Soci-a-bull permission to view and disclose personal information which may include, but may not be limited to, your name, birth date, email address, private messages, and picture, as well as any other information you choose to disclose. Additionally, Soci-a-bull excludes liability for any user information stolen or lost due to a breach in security to the fullest extend of the law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Users may choose to interact, either through digital means, on and/or off soci-a-bull, or in person. Soci-a-bull excludes liability for any injury, theft, loss of life, and/or damage to property resulting from user interactions, whether physical or digital.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this application for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of any information or materials on this application is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this application meet your specific requirements.</Text>
                    <Text style={styles.tcL}>{'\u2022'} This application contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                    <Text style={styles.tcL}>{'\u2022'} All trademarks reproduced in this application, which are not the property of, or licensed to the operator, are acknowledged on the application.
Unauthorised use of this application may give rise to a claim for damages and/or be a criminal offence.</Text>
                    <Text style={styles.tcL}>{'\u2022'} From time to time, this application may also include links to websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</Text>
                    <Text style={styles.tcL}>{'\u2022'} Your use of this application and any dispute arising out of such use of the application are subject to local laws in Florida and the United States, as well as laws in your current location.</Text>
                    <Text style={styles.tcL}>{'\u2022'}User accounts may be deleted at any time for any reason, including all user information contained within it.</Text>
                    <Text style={styles.tcL}>{'\u2022'}Users are prohibited from posting nudity or vulgar content. Users violating this rule may be permanently banned.</Text>
                <Text style={styles.tcP}>The use of this application is subject to the specified terms of use</Text>
            </ScrollView>

            <TouchableOpacity disabled={ !this.state.accepted } onPress={ ()=>(this._navigateToScreen()) } style={ this.state.accepted ? styles.button : styles.buttonDisabled }><Text style={styles.buttonLabel}>Accept</Text></TouchableOpacity>
      </View>
    );
  }

}

const { width , height } = Dimensions.get('window');

const styles = {

  container:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
      fontSize: 22,
      alignSelf: 'center'
  },
  tcP: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcP:{
      marginTop: 10,
      fontSize: 12
  },
  tcL:{
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      fontSize: 12
  },
  tcContainer: {
      marginTop: 15,
      marginBottom: 15,
      height: height * .7
  },

  button:{
      backgroundColor: '#136AC7',
      borderRadius: 5,
      padding: 10
  },

  buttonDisabled:{
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
 },

  buttonLabel:{
      fontSize: 14,
      color: '#FFF',
      alignSelf: 'center'
  }

}
export default TermsAndConditions;