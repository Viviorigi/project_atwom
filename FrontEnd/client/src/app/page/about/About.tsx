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
                <h1 className="text-white"># Về thư viện ATWOM BOOK</h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        

        <h2 className="text-center mb-4">FAQ</h2>
        <h2 className="text-center mb-4">Giải đáp về thư viện</h2>
        {about?.map((a: any) => (
          <>
            <ContainerAbout>
              <BaseButtonQa onClick={() => handleToggle(a.about_id)}
            aria-controls={`about-${a.about_id}`}
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
      <CustomDownArrow />
    </AboutScreenWrapper>

  )
}




