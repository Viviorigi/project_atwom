import React from "react";
import styled from "styled-components";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { staticImages } from "../../utils/images";
import { FormGridWrapper } from "../../styles/form_grid";
import { Container } from "../../styles/styles";
import { Link } from "react-router-dom";

export default function RegisterSuccess() {
  const SignInScreenWrapper = styled.section`
    .form-separator {
      margin: 32px 0;
      column-gap: 18px;

      @media (max-width: ${breakpoints.lg}) {
        margin: 24px 0;
      }

      .separator-text {
        border-radius: 50%;
        min-width: 36px;
        height: 36px;
        background-color: ${defaultTheme.color_purple};
        position: relative;
      }

      .separator-line {
        width: 100%;
        height: 1px;
        background-color: ${defaultTheme.color_platinum};
      }
    }

    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  `;

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.book_form}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div
              className="success-message-container"
              style={{
                maxWidth: "600px",
                padding: "30px",
                textAlign: "center",
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  marginTop: "60px",
                  fontSize: "2rem",
                  color: "#2d3748",
                  marginBottom: "15px",
                }}
              >
                Đăng ký thành công!
              </h2>
              <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
                Cảm ơn bạn đã đăng ký. Vui lòng kiểm tra email để biết thêm
                thông tin chi tiết.
              </p>
              <div
                style={{
                  borderRadius: 150,
                  height: 150,
                  width: 150,
                  background: "#F8FAF5",
                  margin: "40px auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "5px solid grey",
                }}
              >
                <i className="checkmark" style={{ fontSize: "100px" }}>
                  ✓
                </i>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                  padding: "20px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.75rem",
                    color: "#2d3748",
                    marginBottom: "10px",
                  }}
                >
                  Tài khoản của bạn đã được đăng ký!
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#4a5568",
                    marginBottom: "20px",
                  }}
                >
                  Nếu bạn đã hoàn thành quá trình xác minh, bạn có thể đăng nhập
                  ngay bây giờ.
                </p>
                <Link
                  to="/login"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    fontSize: "1rem",
                    color: "white",
                    backgroundColor: "#333",
                    border: "none",
                    borderRadius: "5px",
                    textDecoration: "none",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#555")
                  }
                >
                  Đến trang Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
}
