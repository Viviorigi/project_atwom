import React from 'react'
import styled from 'styled-components';
import { breakpoints, defaultTheme } from '../../styles/themes/default';
import { Link } from 'react-router-dom';

const ScrollbarXWrapper = styled.div`
  overflow-x: scroll;
  max-height: 800px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: grey;
  }
`;

const WishlistTableWrapper = styled.table`
  border-collapse: collapse;
  min-width: 680px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  thead {
    th {
      height: 48px;
      padding-left: 16px;
      padding-right: 16px;
      letter-spacing: 0.03em;

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px;
      }
    }
  }

  tbody {
    td {
      padding: 24px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px 6px;
      }
    }
  }
`;

const WishlistTableRowWrapper = styled.tr`
  .wishlist-tbl {
    &-prod {
      grid-template-columns: 80px auto;
      column-gap: 12px;

      @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 60px auto;
      }
    }

    &-qty {
      .qty-inc-btn,
      .qty-dec-btn {
        width: 24px;
        height: 24px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 2px;

        &:hover {
          border-color: ${defaultTheme.color_sea_green};
          background-color: ${defaultTheme.color_sea_green};
          color: ${defaultTheme.color_white};
        }
      }

      .qty-value {
        width: 40px;
        height: 24px;
      }
    }
  }

  .wishlist-prod-info {
    p {
      margin-right: 8px;
      span {
        margin-right: 4px;
      }
    }
  }

  .wishlist-prod-img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media (max-width: ${breakpoints.xl}) {
      width: 60px;
      height: 60px;
    }
  }
`;

export default function Wishlist() {

  const WISHLIST_TABLE_HEADS = [
    "Chi tiết sách",
    "Tác giả",
    "Năm xuất bản",
    "Xóa",
  ];
  return (
    <div className='container'>
      <h1 className='p-4'>My wishlist</h1>
      <ScrollbarXWrapper>
        <WishlistTableWrapper className="w-full">
          <thead>
            <tr className="text-start">
              {WISHLIST_TABLE_HEADS?.map((column, index) => (
                <th
                  key={index}
                  className={`bg-outerspace text-white font-semibold capitalize text-base ${index === WISHLIST_TABLE_HEADS.length - 1 ? " text-center" : ""
                    }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ backgroundColor: '#f9f9f9' }}>
            <tr>
              <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '10px' }}>
                    <img
                      src="http://localhost:8080/getImage?atchFleSeqNm=1724421205101_FB_IMG_1723707894984.jpg"
                      style={{ width: '250px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 style={{ margin: '0', fontSize: '16px', color: '#333' }}>sach 4</h4>
                  </div>
                </div>
              </td>
              <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                  Tac gia
                </span>
              </td>
              <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                  năm xuất bản
                </span>
              </td>
              <td style={{ padding: '10px', verticalAlign: 'middle', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link to="/" style={{ color: '#e74c3c', cursor: 'pointer', transition: 'color 0.3s' }}>
                    <i className="fa fa-trash"></i>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>

        </WishlistTableWrapper>
      </ScrollbarXWrapper>
    </div>

  )
}
