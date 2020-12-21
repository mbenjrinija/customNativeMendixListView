/**
 * This file was generated from CustomListView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType } from "react";
import { EditableValue, ListValue, ListActionValue, ListWidgetValue } from "mendix";

export interface CustomListViewProps<Style> {
    name: string;
    style: Style[];
    ds: ListValue;
    container: ListWidgetValue;
    scrollView: boolean;
    onClick?: ListActionValue;
    emptyMessage: string;
    scrollToItem?: EditableValue<boolean>;
    scrollItem?: EditableValue<BigJs.Big>;
    windowSize: number;
    initialNumToRender: number;
    maxNumberToRenderPerBatch: number;
    cellBatchingSize: number;
    removeClippedSubviews: boolean;
    useItemLayout: boolean;
    itemSize: BigJs.Big;
}

export interface CustomListViewPreviewProps {
    class: string;
    style: string;
    ds: {} | null;
    container: { widgetCount: number; renderer: ComponentType };
    scrollView: boolean;
    onClick: {} | null;
    emptyMessage: string;
    scrollToItem: string;
    scrollItem: string;
    windowSize: number | null;
    initialNumToRender: number | null;
    maxNumberToRenderPerBatch: number | null;
    cellBatchingSize: number | null;
    removeClippedSubviews: boolean;
    useItemLayout: boolean;
    itemSize: number | null;
}
