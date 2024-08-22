import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BaseButtonQa } from '../../styles/button';
import { Collapse } from 'react-bootstrap';
import CustomUpArrow from '../../comp/common/CustomeUpArrow';
import CustomDownArrow from '../../comp/common/CustomeDownArrow';
import { Container, ContainerAbout } from '../../styles/styles';
import { AboutService } from '../../services/AboutService';
import { AboutDTO } from '../../model/AboutDTO';


const AboutScreenWrapper = styled.section`
  .about-wrapper {
    background: url('https://bglaw.vn/wp-content/uploads/2020/06/web1.png');
    background-size: cover;
    width: 100%;
    height: 30vh;
    justify-content: center;
    background-position: center;
    display: flex;
    flex-direction: column;
  }

  .container {
    margin-top: 50px;
    padding: 0 20px;
  }

  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Roboto', sans-serif;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;
    margin-bottom: 20px;
  }

  li {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 10px;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  .text-center {
    text-align: center;
  }

  .my-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }

  .shop-details h1 {
    font-size: 2.5rem;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 10px;
  }

  .shop-details p {
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
  }
`;



export default function About() {
  const [open, setOpen] = useState(false);
  const [about, setAbout] = useState<AboutDTO[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    AboutService.getInstance().getList({
      keySearch: "",
      limit: 5,
      page: 1,
    }).then((resp: any) => {
      setAbout(resp.data.abouts);
    })
  }, [])

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <AboutScreenWrapper>
      <div className="about-wrapper p-5 d-flex justify-content-center align-items-center">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="shop-details text-center align-items-center">
                <h1 className="text-white">#About the Library</h1>
                <p className="text-white fs-3">Explore Our Growth and Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Our Mission</h2>
        <p>Our library is not just a treasure trove of knowledge but also an open space where everyone can come to learn, explore, and develop themselves. We are committed to providing rich and reliable resources to serve the learning and research needs of the community.</p>

        <h2 className="text-center mb-4">Our History</h2>
        <p>The library was founded with the initial goal of creating a place to preserve and share knowledge. Over the years, we have continuously expanded and updated our collection, becoming one of the leading information and cultural centers in the region.</p>

        <h2 className="text-center mb-4">Privacy Policy</h2>
        <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.</p>

        <h2 className="text-center mb-4">Question</h2>
        {about?.map((a: any) => (
          <>
            <ContainerAbout>
              <BaseButtonQa onClick={() => handleToggle(a.about_id)}
            aria-controls={`about-${a.id}`}
            aria-expanded={openId === a.about_id}
              >{a.question}
                {openId === a.about_id ? <CustomDownArrow /> : <CustomUpArrow />}
              </BaseButtonQa>
            </ContainerAbout>
            <Collapse in={openId === a.about_id}>
              <div id={`about-${a.about_id}`} className='justify-content-center align-content-center' 
              dangerouslySetInnerHTML={{ __html: a.answer }}
              />
              
            </Collapse>
          </>
        ))}

      </div>
    </AboutScreenWrapper>

  )
}




