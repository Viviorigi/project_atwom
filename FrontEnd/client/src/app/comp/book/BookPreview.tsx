import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"
const ProductPreviewWrapper = styled.div`
  grid-template-columns: 72px auto;
  gap: 24px;

  @media (max-width: ${breakpoints.xl}) {
    gap: 16px;
  }

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: 42px auto;
  }

  @media (max-width: ${breakpoints.xs}) {
    grid-template-columns: 100%;
  }

  .preview-items {
    @media (max-width: ${breakpoints.xs}) {
      width: 80%;
      margin-right: auto;
      margin-left: auto;
      order: 2;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .preview-item {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    transition: ${defaultTheme.default_transition};

    @media (max-width: ${breakpoints.sm}) {
      width: 40px;
      height: 40px;
    }

    &:hover {
      opacity: 0.9;
      outline: 1px solid ${defaultTheme.color_gray};
    }

    &-wrapper {
      padding-top: 4px;
      padding-bottom: 4px;

      @media (max-width: ${breakpoints.xs}) {
        display: flex;
        justify-content: center;
      }
    }
  }

  .preview-display {
    height: 600px;
    overflow: hidden;

    @media (max-width: ${breakpoints.md}) {
      height: 520px;
    }

    @media (max-width: ${breakpoints.sm}) {
      height: 400px;
    }

    @media (max-width: ${breakpoints.xs}) {
      height: 320px;
    }
  }
`;

interface BookPreviewProps {
  previewImages?: any[]; // Adjust type as needed
  image?: string;
}

const BookPreview: React.FC<BookPreviewProps> = ({ previewImages, image }) => {

  const [imagePre, setImagePre] = useState<string | undefined>(undefined);

  const [activePreviewImage, setActivePreviewImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (previewImages && previewImages.length > 0) {
      setActivePreviewImage(`${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${previewImages[0].filename}`);
    }
    if (image != undefined) {
      setImagePre(`${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${image}`);
    }
  }, [previewImages, image]);


  const handlePreviewImageChange = (previewImage: any) => {
    setActivePreviewImage(`${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${previewImage.filename}`);
  };

  return (
    <ProductPreviewWrapper className="grid items-center">
      <div className="preview-items w-full">
        {previewImages && previewImages.map((previewImage: any) => {
          return (
            <div
              className="preview-item-wrapper"
              key={previewImage.id}
              onClick={() => handlePreviewImageChange(previewImage)}
            >
              <div className="preview-item">
                <img
                  src={`${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${previewImage.filename}`}
                  alt=""
                  className="object-fit-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="preview-display">
        {previewImages && previewImages.length>0 &&
          <img src={activePreviewImage} className="object-fit-cover" alt=""
            width="500px"
            height="600px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop in case fallback image also fails
              target.src = imageBookDefault; // Set the fallback image
            }}
          />
        }
        {
          image &&
          <img src={image ? imagePre : imageBookDefault} className="object-fit-cover" alt=""
            width="500px"
            height="600px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop in case fallback image also fails
              target.src = imageBookDefault; // Set the fallback image
            }}
          />
        }


      </div>
    </ProductPreviewWrapper>
  );
};

export default BookPreview;

BookPreview.propTypes = {
  previewImages: PropTypes.array,
};
