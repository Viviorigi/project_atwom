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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const ordersPerPage = 5;

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
                const fetchedOrders = await getAllCheckouts(String(userDetail.fullName), 100, 1);

                const filteredOrders = fetchedOrders.filter(order =>
                    !filterStatus || filterStatus.split(',').includes(order.status)
                );

                setTotalCheckouts(filteredOrders.length);
                setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));

                const paginatedOrders = filteredOrders.slice(
                    (currentPage - 1) * ordersPerPage,
                    currentPage * ordersPerPage
                );

                setOrders(paginatedOrders);
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
    }, [userDetail.fullName, filterStatus, currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
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
