import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "../../styles/styles";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import UserMenu from "../../comp/user/UserMenu";
import Title from "../../comp/common/Title";
import OrderItemList from '../../comp/user/OrderItemList';
import { AuthService } from '../../services/AuthService';
import { UserDetail } from '../../model/auth/UserDetail';

const OrderListWrapper = styled.div`
  .order-tabs-contents {
    margin-top: 40px;
  }

  .order-tabs-heads {
    display: flex;
    margin-top: 20px;
    border-bottom: 3px solid ${defaultTheme.color_whitesmoke};

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
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/" },
  { label: "Order", link: "/order" },
];

const OrderList: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
  const { tabId } = useParams<{ tabId: string }>();

  useEffect(() => {
    AuthService.getInstance().getInfo().then((resp: any) => {
      if (resp) {
        setUserDetail(resp.data);
      }
    }).catch(error => {
      console.error('Failed to fetch user info:', error);
    });
  }, []);

  const handleTabClick = (tabId: string) => {
    window.location.href = `/order/${tabId}`;
  };

  const getTabClass = (id: string) => {
    return id === tabId ? 'order-tabs-head order-tabs-head-active' : 'order-tabs-head';
  };

  return (
    <OrderListWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Orders"} />
            <div className="order-tabs">
              <div className="order-tabs-heads">
                {['all', 'progress', 'canceled', 'completed', 'return'].map(id => (
                  <button
                    key={id}
                    type="button"
                    className={getTabClass(id)}
                    onClick={() => handleTabClick(id)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
              <div className="order-tabs-contents">
                <OrderItemList filterStatus={getFilterStatus(tabId)} userUid={userDetail.userUid} />
              </div>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </OrderListWrapper>
  );
};

const getFilterStatus = (tabId?: string) => {
  const statusMap: { [key: string]: string[] } = {
    all: ["REQUESTED", "APPROVED", "REJECTED", "BORROWED", "EXPIRED", "RETURNED", "PENALTY"],
    progress: ["REQUESTED", "APPROVED"],
    canceled: ["REJECTED"],
    completed: ["BORROWED"],
    return: ["EXPIRED", "RETURNED", "PENALTY"]
  };

  return (statusMap[tabId || 'all'] || []).join(',');
};

export default OrderList;
