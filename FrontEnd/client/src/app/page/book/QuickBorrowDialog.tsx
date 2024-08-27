import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { CheckoutDTO, CheckoutStatus } from '../../model/checkout/CheckoutDTO';
import { CheckoutDetailDTO } from '../../model/checkout/CheckoutDetailDTO';
import { addCheckout } from '../../services/CheckoutService';
import { BookDTO } from '../../model/BookDTO';
import { UserDetail } from '../../model/auth/UserDetail';
import styled from 'styled-components';

interface QuickBorrowDialogProps {
  visible: boolean;
  onHide: () => void;
  book?: BookDTO;
  userDetail: UserDetail;
  isLoggedIn: boolean;
  cateid?: number;
  catename?: string;
}

const StyledDialog = styled(Dialog)`
  width: 50vw;
  .p-dialog-header {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const QuickBorrowDialog: React.FC<QuickBorrowDialogProps> = ({
  visible,
  onHide,
  book,
  userDetail,
  isLoggedIn,
  cateid,
  catename,
}) => {
  const [expiredTime, setExpiredTime] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleOrder = async (expiredTime: string) => {
    if (!isLoggedIn) {
      toast.error("Bạn cần phải đăng nhập để đặt hàng");
      return;
    }

    Swal.fire({
      title: "Xác nhận",
      text: "Bạn xác nhận muốn đặt hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#89B449",
      cancelButtonColor: "#E68A8C",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const now = new Date();
        const currentISO = now.toISOString();

        const newCheckoutDetails: CheckoutDetailDTO[] = [{
          id: 0,
          bookId: book?.id || 0,
          bookTitle: book?.title || '',
          cate_id: cateid || 0,
          categoryName: catename || '',
          quantity: 1,
          checkoutId: 0,
        }];

        const newOrder: CheckoutDTO = {
          id: 0,
          user: {
            userUid: userDetail.userUid,
            username: "",
            fullName: userDetail.fullName,
            email: "",
            dob: "",
            className: "",
            phone: "",
            address: "",
            avatar: "",
            cre_dt: "",
            isActive: ""
          },
          userUid: userDetail.userUid ?? 0,
          userFullName: userDetail.fullName ?? "",
          startTime: currentISO,
          endTime: currentISO,
          status: CheckoutStatus.REQUESTED,
          checkoutDetails: newCheckoutDetails,
          expiredTime: expiredTime,
          fine: 0
        };

        try {
          await addCheckout(newOrder);
          toast.success("Đặt hàng thành công!");
          onHide();
        } catch (error) {
          toast.error("Lỗi khi thêm đơn đặt hàng");
        }
      }
    });
  };

  const handleSubmit = () => {
    if (expiredTime) {
      const localDateTime = `${expiredTime}T00:00:00`;
      setError('');
      handleOrder(localDateTime);
    } else {
      setError('Ngày hết hạn không được để trống.');
    }
  };

  return (
    <StyledDialog visible={visible} style={{ width: "60vw" }} onHide={onHide} header="Mượn nhanh">
      <div>
        <label htmlFor="expiredTime">Ngày hết hạn:</label>
        <StyledInput
          type="date"
          id="expiredTime"
          value={expiredTime}
          onChange={(e) => setExpiredTime(e.target.value)}
          placeholder="dd/mm/yyyy"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <DialogFooter>
        <Button label="Tạo đơn" icon="pi pi-check" onClick={handleSubmit} autoFocus className="p-button-text"/>
        <div><label>||</label></div>
        <Button label="Hủy" icon="pi pi-times" onClick={onHide} className="p-button-text" />
      </DialogFooter>
    </StyledDialog>
  );
};

export default QuickBorrowDialog;
