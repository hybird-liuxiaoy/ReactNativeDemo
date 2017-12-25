'use strict';
import React, { Component } from 'react';
import {
    StyleSheet, Dimensions,
    View, Text, TouchableOpacity, FlatList
} from 'react-native';

export default class GridView extends Component {
    constructor(props) {
        super(props);
        const {numColumns = 1} = props;
        this.numColumns = numColumns > 0 ? numColumns : 1;
        this.width = Dimensions.get('screen').width / this.numColumns;
        this.state = {};
    }

    _keyExtractor = (item, index) => item.id || index;

    _renderItem = ({item, index, separators}) => {
        const w = this.width;
        const styleSize = {width: w, backgroundColor: 'white'};
        const style = [styleSize];
        if (this.numColumns > 1) {
            style.push({height: w});
        }
        if ((index + 1) % this.numColumns !== 0) {
            style.push(styles.separatorRow);
        }
        const {data = []} = this.props;
        if (index >= data.length) {
            return (
                <View style={style} />
            );
        }
        let renderItem;
        if (this.props.renderItem) {
            renderItem = this.props.renderItem(item, index);
        } else {
            renderItem = (
                <Text>{item}</Text>
            );
        }
        if (this.props.onItemPress) {
            const {onItemLongPress} = this.props;
            return (
                <TouchableOpacity
                    style={style}
                    activeOpacity={1.0}
                    delayLongPress={3800}
                    onLongPress={() => onItemLongPress && onItemLongPress(item, index)}
                    onPress={() => this.props.onItemPress(item, index)}>
                    {renderItem}
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={style}>{renderItem}</View>
            );
        }
    };

    _renderHeader = () => {
        const {renderHeader} = this.props;
        return (
            <View>
                {renderHeader && renderHeader()}
                <View style={styles.separator} />
            </View>
        );
    };

    _renderFooter = () => {
        const {renderFooter} = this.props;
        return (
            <View>
                <View style={styles.separator} />
                {renderFooter && renderFooter()}
            </View>
        );
    };

    render() {
        const {
            data = [],
            style,
            refreshing = false, refreshData, loadData, emptyComponent
        } = this.props;
        const list = [].concat(data);
        let rows, height;
        rows = Math.max(1, Math.ceil(data.length / this.numColumns));
        if (this.numColumns > 1) {
            height = this.width * rows + SEPARATOR_WIDTH * (rows + 1);
            const max = rows * this.numColumns;
            for (let i = 0; i < max - data.length; i++) {
                list.push({});
            }
        }
        return (
            <View style={[{height}, style]}>
                <FlatList
                    style={styles.container}
                    ItemSeparatorComponent={(separator) => (
                        <View style={styles.separator} />)}
                    // columnWrapperStyle={styles.separator}
                    // getItemLayout={(data, index) => ( {length: this.width, offset: this.width * index, index} )}
                    data={list}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    horizontal={false}
                    numColumns={this.numColumns}
                    ListHeaderComponent={this._renderHeader}
                    ListEmptyComponent={!refreshing && emptyComponent}
                    ListFooterComponent={list.length > 0 && this._renderFooter}
                    refreshing={refreshing}
                    onRefresh={refreshData}
                    onEndReached={loadData}
                    onEndReachedThreshold={1}
                />
            </View>
        );
    }
};
const SEPARATOR_WIDTH = 1;
const SEPARATOR_COLOR = '#d5d5d5';
const styles = StyleSheet.create({
    container: {
        // borderTopWidth: SEPARATOR_WIDTH,
        // borderBottomWidth: SEPARATOR_WIDTH,
        // borderColor: SEPARATOR_COLOR,
        // backgroundColor: 'white'
    },
    separator: {
        height: SEPARATOR_WIDTH,
        backgroundColor: SEPARATOR_COLOR,
    },
    separatorRow: {
        borderRightWidth: SEPARATOR_WIDTH / 2,
        borderColor: SEPARATOR_COLOR,
    },
});
