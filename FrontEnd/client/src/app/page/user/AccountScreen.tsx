import styled from "styled-components";
import { Container } from "../../styles/styles";
import { FormElement } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import UserMenu from "../../comp/user/UserMenu";
import Title from "../../comp/common/Title";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import { useEffect, useState } from "react";
import { UserDetail } from "../../model/auth/UserDetail";
import { AuthService } from "../../services/AuthService";
import defaultPerson from "../../../assets/images/imagePerson.png"
import { format } from "date-fns";
import { BaseLinkGreen } from "../../styles/button";


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
    label: "Home",
    link: "/",
  },
  { label: "Account", link: "/account" },
];

const AccountScreen = () => {
  const [userDetail, SetUserDetail] = useState<UserDetail>(new UserDetail());
  useEffect(() => {
    AuthService.getInstance().getInfo().then((resp: any) => {
      if (resp) {
        SetUserDetail(resp.data);
        console.log(userDetail);
      }
    }
    ).catch()
  }, [])
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
            <Title titleText={"My Account"} />
            <div className="d-flex justify-content-between">
              <h3 className="mt-2">Details Info</h3>
              <div>
              <BaseLinkGreen className="p-2 m-2" to="/change_password">Change Password</BaseLinkGreen>
              <button className="btn btn-primary">Update info</button>
              </div>
            </div>

            <div className="form-wrapper">
              <div className="form-group">
                <label className="form-label font-semibold text-base" style={{ fontSize: "20px" }}>
                  Avatar
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
                    src={userDetail.avatar ? userDetail.avatar : defaultPerson}
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
                  Your Name
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  Email Address
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  Phone Number
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  Address
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  Dob
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  ClassName
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
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
                  Create Date Account
                </label>
                <div className="form-input-wrapper flex items-center" style={{ marginBottom: "20px" }}>
                  <h4 className="form-elem-control text-outerspace font-semibold ">
                    {formatDOB(userDetail.cre_dt)}
                  </h4>
                </div>
              </FormElement>
            </div>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AccountScreenWrapper>

  );
};

export default AccountScreen;
