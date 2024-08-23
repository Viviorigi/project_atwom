import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import PropTypes from 'prop-types';
import { CheckoutDTO } from '../../model/checkout/CheckoutDTO';
import { getAllCheckouts } from '../../services/CheckoutService';
import { AuthService } from '../../services/AuthService';
import { UserDetail } from '../../model/auth/UserDetail';

interface OrderItemListProps {
    filterStatus?: string;
    userUid?: number;
}

const OrderItemList: React.FC<OrderItemListProps> = ({ filterStatus, userUid }) => {
    const [orders, setOrders] = useState<CheckoutDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetail>(new UserDetail());
    const [totalCheckouts, setTotalCheckouts] = useState<number>(0);
    const maxOrdersToShow = 10;

    useEffect(() => {
        AuthService.getInstance().getInfo().then((resp: any) => {
            if (resp) {
                setUserDetail(resp.data);
            }
        }).catch(error => {
            console.error('Failed to fetch user info:', error);
        });
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const fetchedOrders = await getAllCheckouts(String(userDetail.fullName), 10, 1);

                const filteredOrders = fetchedOrders.filter(order =>
                    !filterStatus || filterStatus.split(',').includes(order.status)
                ).slice(0, maxOrdersToShow);

                setOrders(filteredOrders);
                setTotalCheckouts(filteredOrders.length);
            } catch (err) {
                setError('Error fetching orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (userDetail.fullName) {
            fetchOrders();
        }
    }, [userDetail.fullName, filterStatus]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <p>Total Checkouts: {totalCheckouts}</p>
            {totalCheckouts > 0 ? (
                orders.map(order => (
                    <OrderItem key={order.id} checkoutId={order.id} />
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
};

OrderItemList.propTypes = {
    filterStatus: PropTypes.string,
    userUid: PropTypes.number
};

export default OrderItemList;
