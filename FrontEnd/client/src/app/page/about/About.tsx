import React from 'react'
import styled from 'styled-components'

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

        <h2 className="text-center mb-4">Services We Offer</h2>
        <p>We provide a range of services to support learning and research, including:</p>
        <ul>
          <li>Access to thousands of books, journals, and electronic resources.</li>
          <li>Book and material lending services.</li>
          <li>Consultation and research guidance from experts.</li>
          <li>Events and workshops on various topics.</li>
        </ul>

        <h2 className="text-center mb-4">Community and Sustainable Development</h2>
        <p>We believe that a library is not just a place to store information but also the heart of the community. With social activities and sustainable development programs, we aim to build a connected and long-lasting community.</p>

        <h2 className="text-center mb-4">Privacy Policy</h2>
        <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or use our services.</p>

        <h3 className="text-center mb-4">Information We Collect</h3>
        <p>We may collect personal information that you voluntarily provide to us when you register on our site, subscribe to our newsletter, fill out a form, or interact with us in any other way. This may include your name, email address, phone number, and any other details you choose to share.</p>

        <h3 className="text-center mb-4">How We Use Your Information</h3>
        <p>Your personal information may be used in the following ways:</p>
        <ul>
          <li>To personalize your experience and ensure we deliver content relevant to your interests.</li>
          <li>To improve our website and services based on the feedback we receive from you.</li>
          <li>To manage and administer contests, promotions, surveys, or other site features.</li>
          <li>To send periodic communications regarding updates, services, or promotions.</li>
        </ul>

        <h3 className="text-center mb-4">Protecting Your Information</h3>
        <p>We implement a variety of security measures to ensure the safety of your personal information. Your data is stored on secure servers, and only authorized personnel have access to it.</p>

        <h3 className="text-center mb-4">Cookies</h3>
        <p>Our website may use cookies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enable the site's or service provider's systems to recognize your browser and capture and remember certain information.</p>

        <h3 className="text-center mb-4">Third-Party Disclosure</h3>
        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>

        <h3 className="text-center mb-4">Third-Party Links</h3>
        <p>Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites.</p>

        <h3 className="text-center mb-4">Children's Privacy</h3>
        <p>We do not knowingly collect or solicit personal information from children under the age of 13. If we discover that we have collected personal information from a child under 13 without parental consent, we will delete that information as quickly as possible.</p>

        <h3 className="text-center mb-4">Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new policy on this page.</p>

      </div>
    </AboutScreenWrapper>

  )
}
