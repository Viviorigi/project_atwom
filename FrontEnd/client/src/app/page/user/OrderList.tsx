import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from "../../styles/styles";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import UserMenu from "../../comp/user/UserMenu";
import Title from "../../comp/common/Title";
import OrderItemList from "../../comp/user/OrderItemList";
import { CheckoutDTO } from '../../model/checkout/CheckoutDTO';

const OrderListScreenWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
  }

  .order-tabs-head {
    min-width: 170px;
    padding: 12px 0;
    border-bottom: 3px solid ${defaultTheme.color_whitesmoke};
    cursor: pointer;

    &.order-tabs-head-active {
      border-bottom-color: ${defaultTheme.color_outerspace};
    }

    @media (max-width: ${breakpoints.lg}) {
      min-width: 120px;
    }

    @media (max-width: ${breakpoints.xs}) {
      min-width: 80px;
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
];

interface OrderListProps {
  orders: CheckoutDTO[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const filterOrders = (status: string[]) => {
    return orders.filter(order => status.includes(order.status));
  };

  return (
    <OrderListScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Orders"} />
            <div className="order-tabs">
              <div className="order-tabs-heads">
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${activeTab === "all" ? "order-tabs-head-active" : ""}`}
                  onClick={() => handleTabClick("all")}
                >
                  All Order
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${activeTab === "progress" ? "order-tabs-head-active" : ""}`}
                  onClick={() => handleTabClick("progress")}
                >
                  Progress
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${activeTab === "canceled" ? "order-tabs-head-active" : ""}`}
                  onClick={() => handleTabClick("canceled")}
                >
                  Canceled
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${activeTab === "completed" ? "order-tabs-head-active" : ""}`}
                  onClick={() => handleTabClick("completed")}
                >
                  Completed
                </button>
                <button
                  type="button"
                  className={`order-tabs-head text-xl italic ${activeTab === "return" ? "order-tabs-head-active" : ""}`}
                  onClick={() => handleTabClick("return")}
                >
                  Return
                </button>
              </div>

              <div className="order-tabs-contents">
                <div className={`order-tabs-content ${activeTab === "all" ? "active" : ""}`} id="all">
                  <OrderItemList orders={orders} />
                </div>
                <div className={`order-tabs-content ${activeTab === "progress" ? "active" : ""}`} id="progress">
                  <OrderItemList orders={filterOrders(["REQUESTED", "APPROVED"])} />
                </div>
                <div className={`order-tabs-content ${activeTab === "canceled" ? "active" : ""}`} id="canceled">
                  <OrderItemList orders={filterOrders(["REJECTED"])} />
                </div>
                <div className={`order-tabs-content ${activeTab === "completed" ? "active" : ""}`} id="completed">
                  <OrderItemList orders={filterOrders(["BORROWED"])} />
                </div>
                <div className={`order-tabs-content ${activeTab === "return" ? "active" : ""}`} id="return">
                  <OrderItemList orders={filterOrders(["EXPIRED", "RETURNED", "PENALTY"])} />
                </div>
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListScreenWrapper>
  );
};

export default OrderList;
