import styled from "styled-components";
import { Container } from "../../styles/styles";
import { FormElement } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import UserMenu from "../../comp/user/UserMenu";
import Title from "../../comp/common/Title";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import { useEffect, useRef, useState } from "react";
import { UserDetail } from "../../model/auth/UserDetail";
import { AuthService } from "../../services/AuthService";
import defaultPerson from "../../../assets/images/imagePerson.png";
import { format } from "date-fns";
import { BaseLinkGreen } from "../../styles/button";
import { Dialog } from "primereact/dialog";
import UserForm from "./UserForm";

const AccountScreenWrapper = styled.main`
  .address-list {
    margin-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;

    @media (max-width: ${breakpoints.lg}) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .address-item {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 25px;
    row-gap: 8px;
  }

  .address-tags {
    gap: 12px;

    li {
      height: 28px;
      border-radius: 8px;
      padding: 2px 12px;
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  .address-btns {
    margin-top: 12px;
    .btn-separator {
      width: 1px;
      border-radius: 50px;
      background: ${defaultTheme.color_platinum};
      margin: 0 10px;
    }
  }
`;

const breadcrumbItems = [
  {
    label: "Trang chủ",
    link: "/",
  },
  { label: "Tài khoản", link: "/account" },
];

const AccountScreen = () => {
  const [userDetail, SetUserDetail] = useState<UserDetail>(new UserDetail());
  const [open, setOpen] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState<number>(0);
  const handleClickClose = () => {
    setOpen(false);
  };
  const userRef = useRef<any>();

  const editUser = (u: any) => {
    userRef.current = u;
    setOpen(true);
  };

  useEffect(() => {
    AuthService.getInstance()
      .getInfo()
      .then((resp: any) => {
        if (resp) {
          SetUserDetail(resp.data);
          console.log(userDetail);
        }
      })
      .catch();
  }, [saveTrigger]);
  const formatDOB = (date: any) => {
    if (!date) {
      return "Date not provided";
    }
    return format(new Date(date), "dd-MM-yyyy");
  };
  return (
    <AccountScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"Tài khoản của tôi"} />
            <div className="d-flex justify-content-between">
              <h3 className="mt-2">Thông tin chi tiết</h3>
              <div>
                <BaseLinkGreen className="p-2 m-2" to="/change_password">
                  Đổi mật khẩu
                </BaseLinkGreen>
                <button
                  className="btn btn-primary"
                  onClick={() => editUser(userDetail)}
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>

            <div className="form-wrapper" style={{ marginBottom: "50px" }}>
              <div className="form-group">
                <label
                  className="form-label font-semibold text-base mb-3"
                  style={{ fontSize: "20px" }}
                >
                  Ảnh đại diện
                </label>
                <br />
                <div
                  className="preview Image"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      userDetail.avatar
                        ? `${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${userDetail.avatar}`
                        : defaultPerson
                    }
                    alt="Preview"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              </div>
              <FormElement className="form-elem" style={{ marginTop: "90px" }}>
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Tên của bạn
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {userDetail.fullName || ""}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Địa chỉ email
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {userDetail.email || ""}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Số điện thoại
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {userDetail.phone || ""}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Địa chỉ
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {userDetail.address || ""}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Ngày sinh
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {formatDOB(userDetail.dob)}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Lớp
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {userDetail.className || ""}
                  </h4>
                </div>
              </FormElement>
              <FormElement className="form-elem">
                <label
                  htmlFor=""
                  className="form-label font-semibold text-base"
                  style={{ fontSize: "20px" }}
                >
                  Ngày tạo tài khoản
                </label>
                <div
                  className="form-input-wrapper flex items-center"
                  style={{ marginBottom: "20px" }}
                >
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {formatDOB(userDetail.cre_dt)}
                  </h4>
                </div>
              </FormElement>
            </div>
            <Dialog
              baseZIndex={1000}
              style={{ width: "1200px" }}
              visible={open}
              onHide={() => handleClickClose()}
            >
              <UserForm
                user={userRef.current}
                closeForm={handleClickClose}
                onSave={() => {
                  setSaveTrigger(new Date().getTime());
                }}
              />
            </Dialog>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>
  );
};

export default AccountScreen;
