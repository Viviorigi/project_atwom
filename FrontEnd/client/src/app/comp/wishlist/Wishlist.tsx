import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { breakpoints, defaultTheme } from '../../styles/themes/default';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../constants/authConstant';
import { WishService } from '../../services/WishListService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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

interface WishListBook {
  id: number;
  title: string;
  publisher: string;
  publicationYear: number;
  image: string;
}

export default function Wishlist() {

  const WISHLIST_TABLE_HEADS = [
    "Chi tiết sách",
    "Tác giả",
    "Năm xuất bản",
    "Xóa",
  ];

  const [wishlistItems, setWishlistItems] = useState<WishListBook[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get(AuthConstant.ACCESS_TOKEN)) {
      setIsLoggedIn(true);
    }
  }, [])

  useEffect(() => {
    const syncWishlist = async () => {
      if (!isLoggedIn) {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistItems(savedWishlist);
      } else {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

        try {
          // Fetch existing wishlist from the server
          const serverWishlistResponse = await WishService.getInstance().getWishlist();
          const serverWishlist = new Set(serverWishlistResponse.data.map((item: any) => item.bookId));

          // Determine which items need to be added
          const itemsToAdd = await Promise.all(
            savedWishlist.map(async (item: WishListBook) => {
              const isInWishlist = await WishService.getInstance().check(item.id);
              if (!isInWishlist.data) {
                return item; // Return item if it is not in the server's wishlist
              }
              return null; // Return null if item is already in the wishlist
            })
          );

          // Filter out null values and add items that are not already on the server
          const filteredItemsToAdd = itemsToAdd.filter((item: WishListBook | null) => item !== null) as WishListBook[];

          // Add items that are not already on the server
          await Promise.all(
            filteredItemsToAdd.map((item: WishListBook) =>
              WishService.getInstance().add(item.id)
            )
          );

          // Fetch the updated wishlist from the server
          const updatedWishlistResponse = await WishService.getInstance().getWishlist();
          setWishlistItems(updatedWishlistResponse.data);

          // Clear local storage
          localStorage.removeItem('wishlist');
        } catch (err: any) {
          console.error("Error syncing wishlist with server", err);
        }
      }
    };

    syncWishlist();
  }, [isLoggedIn]);

  const handleRemoveItem = (id: number) => {
    if (!isLoggedIn) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== id);
      setWishlistItems(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      Swal.fire({
        title: `Confirm`,
        text: `Do you want to Delete user`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#89B449",
        cancelButtonColor: "#E68A8C",
        confirmButtonText: `Yes`,
        cancelButtonText: `No`,
      }).then((result) => {
        if (result.value) {
          WishService.getInstance().remove(id).then(() => {
            const updatedWishlist = wishlistItems.filter(item => item.id !== id);
            setWishlistItems(updatedWishlist);
            toast.success("remove successfully!")
          }).catch((err: any) => {
            console.error("Error removing item from wishlist", err);
          });
        }
      });
    }
  };

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
            {wishlistItems.length > 0 ? (
              wishlistItems.map((book) => (
                <tr key={book.id}>
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <Link to={`/book/details/?bookId=${book.id}`}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                          <img
                            src={`http://localhost:8080/getImage?atchFleSeqNm=${book.image}`}
                            style={{ width: '120px', height: '120px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            alt={book.title}
                          />
                        </div>
                        <div>
                          <h4 style={{ margin: '0', fontSize: '16px', color: '#333' }}>{book.title}</h4>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                      {book.publisher}
                    </span>
                  </td>
                  <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                      {book.publicationYear}
                    </span>
                  </td>
                  <td style={{ padding: '10px', verticalAlign: 'middle', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link to="#" onClick={() => handleRemoveItem(book.id)} style={{ color: '#e74c3c', cursor: 'pointer', transition: 'color 0.3s' }}>
                        <i className="fa fa-trash"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                  Your wishlist is empty.
                </td>
              </tr>
            )}
          </tbody>

        </WishlistTableWrapper>
      </ScrollbarXWrapper>
    </div>

  )
}
