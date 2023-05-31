import { PureComponent, createRef, createElement } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Big } from 'big.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dist = {};

var common$2 = {};

Object.defineProperty(common$2, "__esModule", {
  value: true
});
common$2.ensure = void 0;
function ensure(arg) {
  if (arg == null) {
    throw new Error("Did not expect an argument to be undefined");
  }
  return arg;
}
common$2.ensure = ensure;

var common$1 = {};

Object.defineProperty(common$1, "__esModule", {
  value: true
});
common$1.extractStyles = common$1.mergeNativeStyles = void 0;
function mergeNativeStyles(defaultStyle, overrideStyles) {
  const styles = [defaultStyle, ...overrideStyles.filter(object => object !== undefined)];
  return Object.keys(defaultStyle).reduce((flattened, currentKey) => {
    const styleItems = styles.map(object => object[currentKey]);
    return Object.assign(Object.assign({}, flattened), {
      [currentKey]: flattenObjects(styleItems)
    });
  }, {});
}
common$1.mergeNativeStyles = mergeNativeStyles;
function flattenObjects(objects) {
  return objects.reduce((merged, object) => Object.assign(Object.assign({}, merged), object), {});
}
function extractStyles(source, extractionKeys) {
  if (!source) {
    return [{}, {}];
  }
  return Object.entries(source).reduce(([extracted, rest], [key, value]) => {
    if (extractionKeys.includes(key)) {
      extracted[key] = value;
    } else {
      rest[key] = value;
    }
    return [extracted, rest];
  }, [{}, {}]);
}
common$1.extractStyles = extractStyles;

var common = {};

Object.defineProperty(common, "__esModule", {
  value: true
});
common.parseInlineStyle = void 0;
function parseInlineStyle(style = "") {
  try {
    return style.split(";").reduce((styleObject, line) => {
      const pair = line.split(":");
      if (pair.length === 2) {
        const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
        styleObject[name] = pair[1].trim();
      }
      return styleObject;
    }, {});
  } catch (_) {
    return {};
  }
}
common.parseInlineStyle = parseInlineStyle;

var typings = {};

var PageEditor = {};

Object.defineProperty(PageEditor, "__esModule", {
  value: true
});

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  var desc = Object.getOwnPropertyDescriptor(m, k);
	  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	    desc = {
	      enumerable: true,
	      get: function () {
	        return m[k];
	      }
	    };
	  }
	  Object.defineProperty(o, k2, desc);
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(PageEditor, exports);
} (typings));

var utils = {};

var PageEditorUtils = {};

Object.defineProperty(PageEditorUtils, "__esModule", {
  value: true
});
PageEditorUtils.moveProperty = PageEditorUtils.transformGroupsIntoTabs = PageEditorUtils.changePropertyIn = PageEditorUtils.hideNestedPropertiesIn = PageEditorUtils.hidePropertiesIn = PageEditorUtils.hidePropertyIn = void 0;
function hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKey) {
  modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, nestedPropIndex, nestedPropKey);
}
PageEditorUtils.hidePropertyIn = hidePropertyIn;
function hidePropertiesIn(propertyGroups, _value, keys) {
  keys.forEach(key => modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined));
}
PageEditorUtils.hidePropertiesIn = hidePropertiesIn;
function hideNestedPropertiesIn(propertyGroups, _value, key, nestedPropIndex, nestedPropKeys) {
  nestedPropKeys.forEach(nestedKey => hidePropertyIn(propertyGroups, _value, key, nestedPropIndex, nestedKey));
}
PageEditorUtils.hideNestedPropertiesIn = hideNestedPropertiesIn;
function changePropertyIn(propertyGroups, _value, modify, key, nestedPropIndex, nestedPropKey) {
  modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey);
}
PageEditorUtils.changePropertyIn = changePropertyIn;
function transformGroupsIntoTabs(properties) {
  const groups = [];
  properties.forEach(property => {
    if (property.propertyGroups) {
      groups.push(...property.propertyGroups);
      property.propertyGroups = [];
    }
  });
  properties.push(...groups);
}
PageEditorUtils.transformGroupsIntoTabs = transformGroupsIntoTabs;
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
  propertyGroups.forEach(propGroup => {
    var _a;
    if (propGroup.propertyGroups) {
      modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
    }
    (_a = propGroup.properties) === null || _a === void 0 ? void 0 : _a.forEach((prop, index, array) => {
      if (prop.key === key) {
        if (nestedPropIndex === undefined || nestedPropKey === undefined) {
          modify(prop, index, array);
        } else if (prop.objects) {
          modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
        } else if (prop.properties) {
          modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
        }
      }
    });
  });
}
function moveProperty(fromIndex, toIndex, properties) {
  if (fromIndex >= 0 && toIndex >= 0 && fromIndex < properties.length && toIndex < properties.length && fromIndex !== toIndex) {
    properties.splice(toIndex, 0, ...properties.splice(fromIndex, 1));
  }
}
PageEditorUtils.moveProperty = moveProperty;

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  var desc = Object.getOwnPropertyDescriptor(m, k);
	  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	    desc = {
	      enumerable: true,
	      get: function () {
	        return m[k];
	      }
	    };
	  }
	  Object.defineProperty(o, k2, desc);
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(PageEditorUtils, exports);
} (utils));

(function (exports) {

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  var desc = Object.getOwnPropertyDescriptor(m, k);
	  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	    desc = {
	      enumerable: true,
	      get: function () {
	        return m[k];
	      }
	    };
	  }
	  Object.defineProperty(o, k2, desc);
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__exportStar(common$2, exports);
	__exportStar(common$1, exports);
	__exportStar(common, exports);
	__exportStar(typings, exports);
	__exportStar(utils, exports);
} (dist));

let clickTimer;
const defaultStyle = {
    container: {},
    contentContainerStyle: {},
    header: {},
    footer: {
        marginBottom: 300,
    },
    emptyView: {},
};
class CustomListView extends PureComponent {
    constructor(props) {
        var _a;
        super(props);
        this.styles = dist.mergeNativeStyles(defaultStyle, this.props.style);
        this.renderFlatListHandler = this.renderFlatList.bind(this);
        this.renderScrollViewHandler = this.renderScrollView.bind(this);
        this.onClickHandler = this.onClick.bind(this);
        this.renderEmptyHandler = this.renderEmpty.bind(this);
        this.renderFooterHandler = this.renderFooter.bind(this);
        this.flatListRef = createRef();
        this.renderItem = ({ item, index }) => {
            const { container, useItemLayout, itemSize, onClick } = this.props;
            const actionValue = onClick === null || onClick === void 0 ? void 0 : onClick.get(item);
            return (createElement(View, null,
                createElement(TouchableOpacity, { onPress: () => this.onClickHandler(item, index), disabled: !(actionValue === null || actionValue === void 0 ? void 0 : actionValue.canExecute) },
                    createElement(View, { key: item.id, style: useItemLayout ? { height: Number(itemSize) } : null }, container.get(item)))));
        };
        this.scrollToOffset = (index) => {
            var _a, _b;
            const { itemSize } = this.props;
            (_a = this.flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToOffset({ animated: true, offset: index * Number(itemSize) });
            (_b = this.props.scrollToItem) === null || _b === void 0 ? void 0 : _b.setValue(false);
        };
        this.state = {
            clickDisabled: false,
            scrollIndex: Number((_a = this.props.scrollItem) === null || _a === void 0 ? void 0 : _a.displayValue),
        };
    }
    render() {
        const { scrollView } = this.props;
        return (createElement(View, { style: this.styles.container }, scrollView ? createElement(this.renderScrollViewHandler, null) : createElement(this.renderFlatListHandler, null)));
    }
    renderFlatList() {
        const { ds, windowSize, initialNumToRender, removeClippedSubviews, maxNumberToRenderPerBatch, cellBatchingSize, useItemLayout, showsHorizontalScrollIndicator, showsVerticalScrollIndicator, itemSize, pullAction, } = this.props;
        const size = Number(itemSize);
        const onPull = () => {
            pullAction === null || pullAction === void 0 ? void 0 : pullAction.execute();
        };
        return (createElement(View, null, useItemLayout ?
            createElement(FlatList, { getItemLayout: (data, index) => ({
                    length: size,
                    offset: size * index,
                    index,
                    data
                }), ref: this.flatListRef, data: ds === null || ds === void 0 ? void 0 : ds.items, renderItem: this.renderItem, windowSize: windowSize, initialNumToRender: initialNumToRender, removeClippedSubviews: removeClippedSubviews, contentContainerStyle: this.styles.contentContainerStyle, ListEmptyComponent: this.renderEmptyHandler(), maxToRenderPerBatch: maxNumberToRenderPerBatch, scrollIndicatorInsets: { right: 0 }, ListHeaderComponent: this.renderHeader(), ListFooterComponent: this.renderFooterHandler(), showsHorizontalScrollIndicator: showsHorizontalScrollIndicator, showsVerticalScrollIndicator: showsVerticalScrollIndicator, refreshing: pullAction === null || pullAction === void 0 ? void 0 : pullAction.isExecuting, onRefresh: (pullAction === null || pullAction === void 0 ? void 0 : pullAction.canExecute) ? onPull : null })
            :
                createElement(FlatList, { data: ds === null || ds === void 0 ? void 0 : ds.items, renderItem: this.renderItem, windowSize: windowSize, initialNumToRender: initialNumToRender, removeClippedSubviews: removeClippedSubviews, contentContainerStyle: this.styles.contentContainerStyle, ListEmptyComponent: this.renderEmptyHandler(), maxToRenderPerBatch: maxNumberToRenderPerBatch, scrollIndicatorInsets: { right: 0 }, ListHeaderComponent: this.renderHeader(), ListFooterComponent: this.renderFooterHandler(), showsHorizontalScrollIndicator: showsHorizontalScrollIndicator, showsVerticalScrollIndicator: showsVerticalScrollIndicator, updateCellsBatchingPeriod: cellBatchingSize, refreshing: pullAction === null || pullAction === void 0 ? void 0 : pullAction.isExecuting, onRefresh: (pullAction === null || pullAction === void 0 ? void 0 : pullAction.canExecute) ? onPull : null })));
    }
    renderScrollView() {
        var _a;
        const { ds, container } = this.props;
        return (createElement(View, null,
            createElement(ScrollView, null, (_a = ds.items) === null || _a === void 0 ? void 0 : _a.map((item) => createElement(View, { key: item.id }, container.get(item))))));
    }
    renderFooter() {
        return createElement(View, { style: this.styles.footer });
    }
    renderHeader() {
        const { headerView } = this.props;
        return createElement(View, { style: this.styles.header }, headerView);
    }
    renderEmpty() {
        const { emptyView } = this.props;
        return createElement(View, { style: this.styles.emptyView }, emptyView);
    }
    onClick(item, index) {
        const { onClick, scrollItem } = this.props;
        const actionValue = onClick === null || onClick === void 0 ? void 0 : onClick.get(item);
        if (!this.state.clickDisabled &&
            (actionValue === null || actionValue === void 0 ? void 0 : actionValue.canExecute) &&
            !(actionValue === null || actionValue === void 0 ? void 0 : actionValue.isExecuting)) {
            this.setState({ clickDisabled: true });
            actionValue === null || actionValue === void 0 ? void 0 : actionValue.execute();
            scrollItem === null || scrollItem === void 0 ? void 0 : scrollItem.setValue(new Big(index));
            clickTimer = window.setTimeout(() => {
                this.setState({ clickDisabled: false });
            }, 3000);
        }
    }
    componentDidMount() {
        const { scrollToItem, useItemLayout } = this.props;
        if (useItemLayout) {
            setTimeout(() => {
                if (useItemLayout) {
                    (scrollToItem === null || scrollToItem === void 0 ? void 0 : scrollToItem.value) ? this.scrollToOffset(this.state.scrollIndex) : null;
                }
            }, 100);
        }
    }
    componentWillUnmount() {
        const { scrollToItem } = this.props;
        clearTimeout(clickTimer);
        scrollToItem === null || scrollToItem === void 0 ? void 0 : scrollToItem.setValue(false);
    }
}

export { CustomListView };
