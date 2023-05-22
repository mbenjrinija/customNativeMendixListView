import { PureComponent, ReactNode, createElement, createRef } from "react";
import { View, FlatList, ScrollView, TouchableOpacity, ViewStyle } from "react-native";
import { ObjectItem } from "mendix";
import { Big } from "big.js"

import { CustomListViewProps } from "../typings/CustomListViewProps"
import { Style, mergeNativeStyles } from '@mendix/pluggable-widgets-tools';

let clickTimer: number;

export interface CustomStyle extends Style {
    container: ViewStyle,
    contentContainerStyle: ViewStyle,
    footer: ViewStyle,
    emptyView: ViewStyle
}

const defaultStyle: CustomStyle = {
    container: {},
    contentContainerStyle: {},
    footer: {
        marginBottom: 300,
    },
    emptyView: {},
};

interface State {
    clickDisabled?: boolean;
    scrollIndex: number;
}

export class CustomListView extends PureComponent<CustomListViewProps<CustomStyle>, State> {
    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);
    constructor(props: CustomListViewProps<CustomStyle>) {
        super(props)
        this.state = {
            clickDisabled: false,
            scrollIndex: Number(this.props.scrollItem?.displayValue),
        }
    }
    renderFlatListHandler = this.renderFlatList.bind(this);
    renderScrollViewHandler = this.renderScrollView.bind(this);
    onClickHandler = this.onClick.bind(this);
    renderEmptyHandler = this.renderEmpty.bind(this);
    renderFooterHandler = this.renderFooter.bind(this);
    flatListRef = createRef<FlatList<any>>();

    render(): ReactNode {
        const { scrollView } = this.props;
        return (
                <View style={this.styles.container}>{scrollView ? <this.renderScrollViewHandler /> : <this.renderFlatListHandler />}</View>  
        )
    }

    renderFlatList() {
        const { ds, windowSize, initialNumToRender, removeClippedSubviews, maxNumberToRenderPerBatch, cellBatchingSize, useItemLayout, itemSize, pullAction } = this.props;
        const size = Number(itemSize)
        const onPull = () => {
            pullAction?.execute();
        };
        return (
            <View>
                {useItemLayout ?
                    <FlatList
                        getItemLayout={(data, index) => ({
                            length: size,
                            offset: size * index,
                            index,
                            data
                            })}
                        ref={this.flatListRef}
                        data={ds?.items}
                        renderItem={this.renderItem}
                        windowSize={windowSize}
                        initialNumToRender={initialNumToRender}
                        removeClippedSubviews={removeClippedSubviews}
                        contentContainerStyle={this.styles.contentContainerStyle}
                        ListEmptyComponent={this.renderEmptyHandler()}
                        maxToRenderPerBatch={maxNumberToRenderPerBatch}
                        ListFooterComponent={this.renderFooterHandler()}
                        refreshing={pullAction?.isExecuting}
                        onRefresh={pullAction?.canExecute ? onPull : null}
                    />
                    :
                    <FlatList
                        data={ds?.items}
                        renderItem={this.renderItem}
                        windowSize={windowSize}
                        initialNumToRender={initialNumToRender}
                        removeClippedSubviews={removeClippedSubviews}
                        contentContainerStyle={this.styles.contentContainerStyle}
                        ListEmptyComponent={this.renderEmptyHandler()}
                        maxToRenderPerBatch={maxNumberToRenderPerBatch}
                        ListFooterComponent={this.renderFooterHandler()}
                        updateCellsBatchingPeriod={cellBatchingSize}
                        refreshing={pullAction?.isExecuting}
                        onRefresh={pullAction?.canExecute ? onPull : null}
                    />
                }
            </View>
        );
    }

    renderScrollView() {
        const { ds, container } = this.props;
        return (
            <View>
                <ScrollView>
                    {ds.items?.map((item) => <View key={item.id}>{container(item)}</View>)}
                </ScrollView>
            </View>
        );
    }

    renderItem = ({ item, index }: { item: ObjectItem, index: number }) => {
        const { container, useItemLayout, itemSize } = this.props;
        return (
            <View>
            <TouchableOpacity onPress={() => this.onClickHandler(item, index)} disabled={this.state.clickDisabled}>
            <View key={item.id} style={useItemLayout ? { height: Number(itemSize) } : null}>{container(item)}</View>
            </TouchableOpacity>
        </View>
        )
    }

    renderFooter() {
        return <View style={this.styles.footer}></View>
    }

    scrollToOffset = (index: number) => {
        const { itemSize } = this.props
        this.flatListRef.current?.scrollToOffset({ animated: true, offset: index * Number(itemSize) })
        this.props.scrollToItem?.setValue(false);
    }
    
    renderEmpty() {
        const { emptyView } = this.props;
        return <View style={this.styles.emptyView} >{emptyView}</View>
    }

    onClick(item: ObjectItem, index: number) {
        const { onClick, scrollItem } = this.props;
        const actionValue = onClick!(item);
        if (!this.state.clickDisabled) {
            this.setState({ clickDisabled: true });
            actionValue.execute();
            scrollItem?.setValue(new Big(index));
            clickTimer = window.setTimeout(() => {
                this.setState({ clickDisabled: false });
            }, 3000);
        }
    }

    componentDidMount() {
        const { scrollToItem, useItemLayout } = this.props
        if (useItemLayout) {
            setTimeout(() => {
                if (useItemLayout) {
                    scrollToItem?.value ? this.scrollToOffset(this.state.scrollIndex) : null;
                }
            }, 100)
        }
    }

    componentWillUnmount() {
        const { scrollToItem } = this.props;
        clearTimeout(clickTimer)
        scrollToItem?.setValue(false)
    }
}