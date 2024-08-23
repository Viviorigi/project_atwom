import React from 'react';
import OrderItemList from './OrderItemList';

interface OrderItemTabProps {
    activeTab: string;
    handleTabClick: (tabId: string) => void;
    userUid?: number;
}

const getTabClasses = (activeTab: string, tabId: string): string => {
    return `order-tabs-content ${activeTab === tabId ? "active" : ""}`;
};

const renderTabContent = (tabId: string, activeTab: string, userUid?: number) => {
    const statusMap: { [key: string]: string[] } = {
        all: ["REQUESTED", "APPROVED", "REJECTED", "BORROWED", "EXPIRED", "RETURNED", "PENALTY"],
        progress: ["REQUESTED", "APPROVED"],
        canceled: ["REJECTED"],
        completed: ["BORROWED"],
        return: ["EXPIRED", "RETURNED", "PENALTY"]
    };

    const filterStatus = statusMap[tabId] || [];

    return (
        <div className={getTabClasses(activeTab, tabId)}>
            <OrderItemList filterStatus={filterStatus.join(',')} userUid={userUid} />
        </div>
    );
};

const OrderItemTab: React.FC<OrderItemTabProps> = ({ activeTab, handleTabClick, userUid }) => {
    return (
        <div className="order-tabs-contents">
            {renderTabContent("all", activeTab, userUid)}
            {renderTabContent("progress", activeTab, userUid)}
            {renderTabContent("canceled", activeTab, userUid)}
            {renderTabContent("completed", activeTab, userUid)}
            {renderTabContent("return", activeTab, userUid)}
        </div>
    );
};

export default OrderItemTab;
