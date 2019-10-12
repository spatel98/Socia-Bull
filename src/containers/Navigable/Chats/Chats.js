import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
Card, ListItem, Icon
} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';


const msgs = [
  {
    name: 'Brynn',
    photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    username: 'brynn@mail.usf.edu',
    lastMessage: "Hey what's up?"
  },
  {
    name: 'Mario',
    photo: 'http://www.newdesignfile.com/postpic/2015/02/mario-128x128-icon_245367.png',
    username: 'MarioMario@mail.usf.edu',
    lastMessage: 'Epic'
  },
  {
    name: 'Jeff',
    photo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUSEhIQFhUWEhIWFxUWEhAXFhUXFRUWGBUSFhUYHyghGBolHRcVITEhJikrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy4mHSUtLy0tKy8tLi0tLy0tLS0rLS0vLystLS0rLS0tLS4tLS0rLTItLS0tLS0tLS0tLSstLf/AABEIAIAAgAMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAABgMEBQIHAQj/xAA+EAABAwICBwUFBAkFAAAAAAABAAIDBBEGIQUSMUFRYXFSgaHB0RMiMpGxQmJyogcWIzOCksLh8AgUQ1Oy/8QAGwEAAQUBAQAAAAAAAAAAAAAAAAECAwQFBgf/xAA1EQACAQMCAwUGBQQDAAAAAAAAAQIDBBEFIRIxQRNRYYGxFDJxkaHRBiLB4fAVMzRyI1Ji/9oADAMBAAIRAxEAPwD3FAAgAQBDV1UcLS+Rwa0bz9OZ5Jk5xguKTwhspKKyxH0xjp5JbTtDR23C7j0bsHfdZNbUm9qa8yhUvHygYX6zVt7+3f8Alt8rWVP2yvz4iD2ip3jDoTHBuGVIFv8AsaNn4m+nyV6hqTzir8yxSvOk/mO7JWuaHAgtIuDfK3G61k01lF9PO6PzdS4grNK4hjfBNKGiptGA52qynjN3e7ss5jSTxLkop+lEACABAAgAQAIAEACAPjnAC5IA4lGcALumsY01OCGuEj9wafdHV3oqVa+p09o7srVbqEOW7PO9L6dkqXa0jieDQLNb0HmsWtWnVeZMzalaU3lmcankfBRcJHk4dVns+KXhEyR/749nxS8AuRiGKXQ6GrjcgxsDI89hqPcFuhJK2NOm+FwfQ0rKbcXHuMD/AE3aHDpqmrcP3bGxMPOQ6ziO5oH8S0i6e+IAEACABAAgAQAIAEAcyMDgQ4AgixBFwRwISNJrDBrIpaWwFTykuicYid1tZvy2hZ9XToS3g8ehTqWcZbx2FyrwDVs+ExvHJ1j+aypz0+suWGVZWdRctxYqo/ZOLHlgcNo12HxBsqcoSi8MqvZ4ZFrN4t/mam4YhwHxFwaZIm3Nrue0AdTuT4wlJ7IVLIsfpFq3wONKyaGWGSOGTWidrDWaX3B5gk9wC3LOiqcOeX1Na1pxhHZ5fU9R/QdVU9LosF7wHyzSyFouXZEMGQ2ZMv3p9W7o0niT3H1LmlTeJPcd5sUM+wxx5uIHgLrPqaxFe5HPxKk9RivdRW/WWXsR/m9VW/rFX/qvr9yH+o1O5F2kxEw5SNLeYzHqrVHV4S2qLH1J6eoRe01g2YpWvF2kEcQtaE4zXFF5RfjJSWUztOHAgAQAIAEAQVlUyJpe82A+Z5Abyoq1aFKPHN7EdSrGnHilyPOcT6dmqbtBLI+wDt/Ed/TYucuNQqVnhbR7vuc9dXtSq8LaPd9xHqqK6ihUwVIzwZ79GE7lOqxMqoN0GXcQl9pwPVczcS4OqnNa+FvtA0OuG/HbLY3f3K7Z3lNNqW2fkaNlcxWVLbIxYHc+OCNjmkENzBBBFyTmCs++adaTRRup5rS+I+UwJVHDZGk2W2wkbUvBjmSKGOZ3qpcC4JqSqfCdZh6jceoU1GvOhLig/Ikp1ZUnmI1aOr2zNuMiNrd4PoultbqNeGVz6o2aFeNWOUW1ZJgQAIA+E2zKRtJZYN4EXEWkzK77oyaPPquUvrp16n/lcjnby4dWXh0FiofdVEZ7ZV1LpcjSeKkB3I4hyRbioQk4iRRLsEWrsQpNEsXgtCTiAe4J/aEnGTsmO4BKqjHKbOrkozkXOTqyUU+EIA+0dW6F4eO8cRvCfQryoVFNefwClVdKfEh1ikDmhwzBAI711sJqcVJcmb8ZKSTR2nDgQBlYiqdSKw2uy7t6zNUrcFHhXN+hRv6vBTwup59XS5rmjnpMypHJxEyWBqRgjUp400lii21qCVGdPpFxeWQs1iNp3dyco941y3wiXR+kPaEscNV43cenPkhrAsZZNJqESomaVIh6O7pRxjyaXke4iCPWA2uN8+nBGSJ1G/dR1Q6QE1wRqvG0eYUchnFkcsLVOswsP2TcdD/e/wA1v6RW4qbpvp6M2NPqZg4Pobi1zRBACtiuX3wODfr/AIFzmrzzWUe5GLqMszx3ISaxyy0Y8ihvThjL1M1MY5G/Q0gIBPyTTTt7ZSjxSJamlAFxe2/1Sjq9soLiiZ1FRtiBAubm5J28glbyU0sHbqZheHke8NhSZ6BjfJOClQ5HYcnJjkz68ggg7CCD0KXIuSKnibG3VYLD69SkbEWEsIii0e103tBcEg34cym56BTpdpPCGXQMYZLlfNpHn5LS0mWLjHen9zYtqMactu4ZF0xeBACbik/tXdG/+QuW1P8AyZeXojA1D+6/50E+rVFGZIqN2pzGGhTKNjojFQTAtAvYhIbNrVi4KL5okrJwGkXHoEo65rR4eFc2YNdpVkQ1nOa1vacbfIb0+FNyeEjPScnhC9U40hGwyu6NDR42VuNlN88ImVvNkLcax9mb+ZvqnexS70Hs0u8tMxlB2pR1ZdRuzqeAnYTOji+HtSn+AI9kmJ2MzmnxSx5sPajqR87XRK1kl0B0ZIZdEaSBIJNwcr+qrSjgWhU7Of5hp0Q8GVtiPtb/ALpVvTf8mPn6M2KU4uSwxkXVlsEAJ+KmftDzaD4W8ly+qLFw33pGFqC/5WJ9WFQRlyKbdqUjZfpkxjomlCckhOirpeqEbC47GtLj0G5SU4uTwh6WXhHk2ktIyVDy956Dc0dkBb1OlGnHCNOEFBYRU11JgfgNdGAwdiVJwiYJY5UxxGtFiKaxBG5Mcc7DGh00FN7xG4t1h1WbWW2SpUWx6Dhga0zD91x/KR5qTTI5uV4Z9CaxWay8/QdF1JvAgBfxXBcNf1afqPNYWsU/dn5GVqUOUvIRatixEYkkZ5CcRst05TWKjQhcmk0WZeLIXPhla3aYjbnY3srVr/dj8SxQ3qRXiIVHh/W/eSW5MbreJI+hXVwspP3ng6yjo1WW9R48Ob+xu0WGaW2bZHH7zz/Taysxsqa5mlDRaC55fmaLMIUTm/u3jiRK+4553TvY6XcOlpFtyw/mfXYSghF2xNkbv1rlw65/RPjbUl0LNHTrLGODfx3InYfpX7IgOBBIPgiVrSkvdHVNLtJLDgl8NjI0jhGRo1oDrjsOsHdx2HwVGtp7W9PfwMO70OUfzUHldz5/uXcMEl9iCCxliCMwchYrnLqPDs+85SvFx2fPJ6zg2myLzuaGjvzPkrWj0sylU8i3psN3PyGdbxrAgCtpGm9rG5u+1x1GxVruh21Jw69PiQ3FLtKbied6QgsSuQaw8M5iccMyJWJSFo+xOskYhehekJEySoZrt5jdxCWLwyZMVpaTUdls3ei7Ow1CFeKjJ4n6+KO80vWKdxBQqPFRc89fFfYtwPIWqjoIs0qWo+aUJwNKGUXy/wA4pCBpleopw11xsOfQ70EqllbkkbEEbZHHRtMmQGs4i9hm62wLC1q046arR5rZ+KZzn4gsVUp+0QX5ls/FPb5p/Q9J0ZS+yjazfa56napbSh2NJQ69fiULel2dNRLSsEwIAEALGJtGf8jRkfi5Hj3rntUtOGXax5Pn8f3Ma/tsPtFyfMTqmGyyEZEkUnNslGEkclkgIssmSD1IrVjGP2ix4j0Tk2gbMlsZY8e9cXFxnmFpWt7UpTi8vGd1k0LHUq9tVjLifCmsrO2OuxfI1XdCu1zndHq6alHK5GjC5KQSRb+IdEgxbHyMIGs0NARF1THbcS49ACo6vuMrXkkqEsj6qZzoIAEACAOXsDgQRcHIhNlFSWHyEaUlhihpzQhZ7zRdh38ORXM3thKg+KO8fT4mFd2bpvK5CzUUxCzjNlEpuYQlGHOsQlAikkSpAUap2xSxHovNkL2hxNydvUZLs9MqupbRb5rb5Hp34fuHWsYZ5xzH5cvpguUj8lfNWa3L0RSELJUgwbcKaP1GGVw95+zk3++35KtWnl4MbUK/FLgXJepvKEzgQAIAEACAPjgDkUjSawxGs7MwtJ4fDrmOw+6dncVjXWlJ/mpfL7Gbcaepb0/kKtdoxzDZzSDzCxKlKdN4msGPUoyg8SWDLmpiExELiUJo09MTBQqQpYiou6OzZbgSfHPyXR6JV2lT8/0f6HbfhS4S46L/ANl6P9CeJ2qVvHYyWUXoZUEMom/h/RZqHazh+zacz2j2R5qGpPhXiZ95cqjHC95/zI8AWVQ58+oAEACABAAgAQAIAjmha8WcARwITJ041FiSyhsoRmsSWTGrMMRP+Bzm8to9VmVdIpS3g8fUoVNOpy914MSqwXKfhfGeusPJVJaRVXKSKctLqdGjNfgCqcfjhA/E8/0p0dLrdWv55CLS6vVo0tG/o/DCDJOTt91jbDPbmb/RXrWxlRmp8W6NGytZ21WNWMt1/MHUuBXX92YW5sN/Ara7fwOqjrCxvD6lvR+CmMN5ZHPHZA1QepuSmuu+hDV1aUliEcfUaIYmsAa0AACwAFgFC3kypScnl8ztINBAAgAQAIAEACABAAgAQAIAEACABAAgAQAIAEACAP/Z',
    username: 'Jeff@mail.usf.edu',
    lastMessage: 'Trying to study today?'
  }
  ]

  const cardstyles = StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: "#ffffff",
    },
    imagestyle: {
      width: 50,
      height: 50

    },
    textstyle:{
      paddingLeft: 16,
      paddingTop: 14
    }
  }
  ); 






export default class Chats extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        
        <Card title="Chats" containerStyle={cardstyles.container}>
        {

        msgs.map((u, i) => {
          
          return (
            <ListItem
              key={i}
              leftElement={
                <Image
                style={cardstyles.imagestyle}
                resizeMode="cover"
                source={{uri: u.photo}}
                />
              }

              
              rightElement={
                <Icon name='arrow-right' color={'grey'} size={24} type ='material-community'/>
              }
              title={u.name}
              subtitle={u.lastMessage}
              borderBottomWidth={1}
            />
          );
      })

    }
    </Card>
      </KeyboardAwareScrollView>
    );
  }
}

