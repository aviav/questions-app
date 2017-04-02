import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View } from 'react-native';

class Questions extends Component {
    // Initialize the hardcoded data
    constructor(props) {
        super(props);

        this.state = { dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }),
                       jsonData: [] };
    }

    componentDidMount() {
        this.getQuestionsFromApi().done();
    }

    render() {
        const rows = this.state.dataSource.cloneWithRows(
            this.state.jsonData.map(function(question) {
                return question.title;
            })
        );
        return (
                <View style={{flex: 1, paddingTop: 22}}>
                <ListView
            dataSource={rows}
            renderRow={(rowData) => <Text>{rowData}</Text>}
                />
                </View>
        );
    }

    async getQuestionsFromApi() {
        try {
            let response = await fetch('http://questions.aviav.de');
            let responseJson = await response.json();

            await this.setState({jsonData: responseJson});
        } catch(error) {
            console.error(error);
        }
    }
}

// App registration and rendering
AppRegistry.registerComponent('Questions', () => Questions);
