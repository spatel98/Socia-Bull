
import React , {Component} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
};

class PrivacyPolicy extends Component{

  state = {
      accepted: false
  }
  _navigateToScreen = () => {
    const { navigation } = this.props.navigation.navigate('Settings');
  }

  render(){
    return (
     <View style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
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
                <Text style={styles.tcP}>Soci-a-bull built the Soci-a-bull app as a Freemium/ad-supported app. This SERVICE is provided by Soci-a-bull at no cost and is intended for use as is.</Text>
                <Text style={styles.tcP}>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</Text>
                <Text style={styles.tcP}>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</Text> 
                <Text style={styles.tcP}>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Soci-a-bull unless otherwise defined in this Privacy Policy.</Text>   
                <Text style={styles.tcLB}>{'\u2022'} Information Collection and Use</Text>    
                <Text style={styles.tcL}>{'\u2022'}For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, email, birth date, gender. The information that we request will be retained by us and used as described in this privacy policy.</Text>
                <Text style={styles.tcL}>{'\u2022'}The app does use third party services that may collect information used to identify you.</Text>
                <Text style={styles.tcL}>{'\u2022'}Privacy policy of third party service providers used by the app can be found at</Text>
                <Text style={styles.tcL}>{'\u2022'}Google Play Services</Text>
                <Text style={styles.tcL}>{'\u2022'}Firebase Analytics</Text>
                <Text style={styles.tcLB}>{'\u2022'}Log Data</Text>
                <Text style={styles.tcL}>{'\u2022'}We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Cookies</Text>
                <Text style={styles.tcL}>{'\u2022'}Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</Text>
                <Text style={styles.tcL}>{'\u2022'}This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Service Providers</Text>
                <Text style={styles.tcL}>{'\u2022'}We may employ third-party companies and individuals due to the following reasons:</Text>
                <Text style={styles.tcL}>{'\u2022'}To facilitate our Service;</Text>
                <Text style={styles.tcL}>{'\u2022'}To provide the Service on our behalf;</Text>
                <Text style={styles.tcL}>{'\u2022'}To perform Service-related services; or</Text>
                <Text style={styles.tcL}>{'\u2022'}To assist us in analyzing how our Service is used.</Text>
                <Text style={styles.tcL}>{'\u2022'}We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Security</Text>
                <Text style={styles.tcL}>{'\u2022'}We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Links to Other Sites</Text>
                <Text style={styles.tcL}>{'\u2022'}This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Children’s Privacy</Text>
                <Text style={styles.tcL}>{'\u2022'}These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</Text>
                <Text style={styles.tcLB}>{'\u2022'}Changes to This Privacy Policy</Text>
                <Text style={styles.tcL}>{'\u2022'}We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</Text>
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
  tcLB:{
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold'
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
export default PrivacyPolicy;