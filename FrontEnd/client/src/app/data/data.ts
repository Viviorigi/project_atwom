import { staticImages } from "../utils/images";

const navMenuData = [
    {
      id: "nav-menu-1",
      menuLink: "/",
      menuText: "Shop",
    },
    {
      id: "nav-menu-2",
      menuLink: "/",
      menuText: "Men",
    },
    {
      id: "nav-menu-3",
      menuLink: "/",
      menuText: "Women",
    },
    {
      id: "nav-menu-4",
      menuLink: "/",
      menuText: "Combos",
    },
    {
      id: "nav-menu-5",
      menuLink: "/",
      menuText: "Fashion",
    },
  ];



  const footerData = [
    {
      id: "f_need_help",
      title: "Need Help",
      links: [
        { text: "Contact Us", url: "/contact" },
        { text: "Track Order", url: "/track_order" },
        { text: "Returns & Refunds", url: "/returns_refunds" },
        { text: "FAQ's", url: "/faqs" },
        { text: "Career", url: "/career" },
      ],
    },
    {
      id: "f_company",
      title: "Company",
      links: [
        { text: "About Us", url: "/contact" },
        { text: "Achats Blog", url: "/blog" },
        { text: "Achatsian", url: "/achatsian" },
        { text: "Collaboration", url: "/collaboration" },
        { text: "Media", url: "/media" },
      ],
    },
    {
      id: "f_more_info",
      title: "More info",
      links: [
        { text: "Terms and conditions", url: "/tac" },
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Shipping Policy", url: "/shipping" },
        { text: "Sitemap", url: "/sitemap" },
      ],
    },
    {
      id: "f_location",
      title: "Location",
      lists: [
        { text: "Tsupport@euphoria.in" },
        { text: "Highland Strett, A04 Street 4014" },
        { text: "New York City, USA" },
        { text: "Phone: +000 999 8888" },
      ],
    },
  ];

  const sideMenuData = [
    {
      id: "side-menu-1",
      menuLink: "/",
      menuText: "Home",
      iconName: "house",
    },
    {
      id: "side-menu-2",
      menuLink: "/product",
      menuText: "Products",
      iconName: "grid-fill",
    },
    {
      id: "side-menu-3",
      menuLink: "/wishlist",
      menuText: "Wishlist",
      iconName: "heart",
    },
    {
      id: "side-menu-4",
      menuLink: "/account",
      menuText: "My Account",
      iconName: "person-fill",
    },
    {
      id: "side-menu-5",
      menuLink: "/cart",
      menuText: "Cart",
      iconName: "bag-check-fill",
    },
  ];

  const bannerData = [
    {
      id: "banner-1",
      topText: "T-shirt / Tops",
      titleText: "Summer Value Pack",
      bottomText: "cool / colorful / comfy",
      buttonLink: "/",
      buttonText: "Shop Now",
      imgSource: staticImages.hero1,
    },
    {
      id: "banner-2",
      topText: "Quality / Branded",
      titleText: "Season Of Offers",
      bottomText: "offers / heavy discount / coupons",
      buttonLink: "/",
      buttonText: "Shop Now",
      imgSource: staticImages.hero1,
    },
    {
      id: "banner-3",
      topText: "Seasonal Attire / Collection",
      titleText: "New Arrivals & Special",
      bottomText: "stylish / trendy",
      buttonLink: "/",
      buttonText: "Shop Now",
      imgSource: staticImages.hero1,
    },
    {
      id: "banner-4",
      topText: "Party & Wedding Dress",
      titleText: "Fashionable Choice for Occasion",
      bottomText: "offers / discounts / coupons",
      buttonLink: "/",
      buttonText: "Shop Now",
      imgSource: staticImages.hero1,
    },
  ];
  const newArrivalData = [
    {
      id: "new-arrival-1",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-2",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-3",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-4",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-5",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-6",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
    {
      id: "new-arrival-7",
      imgSource: staticImages.book_category1,
      title: "Title",
    },
  ];

  const feedbackData = [
    {
      id: "feedback-1",
      imgSource: staticImages.test1,
      name: "Floyd Miles",
      designation: "Marketing Manger",
      rating: 3,
      feedbackText:
        "I am incredibly pleased with my recent shopping experience on this clothing ecommerce website. The user-friendly interface made it a breeze to browse through a wide range of stylish options. The variety of sizes and styles available was impressive, and I found the perfect outfit for a special occasion. ",
    },
    {
      id: "feedback-2",
      imgSource: staticImages.test1,
      name: "Ronald Richards",
      designation: "Teacher",
      rating: 4,
      feedbackText:
        "This clothing ecommerce website has become my go-to destination for fashion finds. The selection is fantastic, catering to various tastes and preferences. From casual wear to elegant pieces, I always discover something unique and stylish. The website's organization and clear product images make it easy to make informed choices. ",
    },
    {
      id: "feedback-3",
      imgSource: staticImages.test1,
      name: "Savannah Nguyen",
      designation: "Student",
      rating: 4,
      feedbackText:
        "I want to express my gratitude for the exceptional service provided by this clothing ecommerce website. Not only is the website intuitive and easy to navigate, but the customer service team also went above and beyond to assist me with a query. ",
    },
    {
      id: "feedback-4",
      imgSource: staticImages.test1,
      name: "Arthur Ramsay",
      designation: "Fashion Designer",
      rating: 4,
      feedbackText:
        "I recently made a purchase from this clothing ecommerce website, and I couldn't be happier with my experience. The website is well-designed, making it easy to navigate and find the items I was looking for. The product descriptions were detailed, helping me make informed decisions.",
    },
  ];

  const orderData = [
    {
      id: "order_1",
      order_no: "#5558760098",
      order_date: "2 June 2023 2:40 PM",
      status: "Delivered",
      delivery_date: "8 June 2023",
      payment_method: "Cash on Delivery",
      items: [
        {
          id: "product_01",
          name: "Printed white coat",
          color: "White",
          quantity: 1,
          price: 23,
          imgSource: staticImages.book_order,
        },
        {
          id: "product_02",
          name: "Stretchy jumper for women",
          color: "Maroon",
          quantity: 5,
          price: 21,
          imgSource: staticImages.book_order,
        },
        {
          id: "product_03",
          name: "Black Color Hoodie",
          color: "Black",
          quantity: 10,
          price: 90,
          imgSource: staticImages.book_order,
        },
      ],
    },
    {
      id: "order_2",
      order_no: "#8958360118",
      order_date: "2 June 2023 2:40 PM",
      status: "inprogress",
      delivery_date: "12 August 2023",
      payment_method: "Online Payment",
      items: [
        {
          id: "product_04",
          name: "Stretchy jumper for women",
          color: "Maroon",
          quantity: 5,
          price: 21,
          imgSource: staticImages.book_order,
        },
        {
          id: "product_05",
          name: "Printed white coat",
          color: "White",
          quantity: 1,
          price: 23,
          imgSource: staticImages.book_order,
        },
        {
          id: "product_08",
          name: "Black Color Hoodie",
          color: "Black",
          quantity: 10,
          price: 90,
          imgSource: staticImages.book_order,
        },
      ],
    },
  ];
  const books = [
    {
      id: 1,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 2,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 3,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 4,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 5,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 6,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 7,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 8,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 9,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 10,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 11,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 12,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 13,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 14,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 15,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 16,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 17,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 18,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
    {
      id: 19,
      imgSource: staticImages.book_order,
      title: "Title",
      brand: "Title",
      price: 123.0,
    },
  ];

  const ProductFilterList = [
    {
      id: "prod_filter_1",
      title: "Title",
    },
    {
      id: "prod_filter_2",
      title: "Title",
    },
    {
      id: "prod_filter_3",
      title: "Title",
    },
    {
      id: "prod_filter_4",
      title: "Title",
    },
    {
      id: "prod_filter_5",
      title: "Title",
    },
    {
      id: "prod_filter_6",
      title: "Title",
    },
    {
      id: "prod_filter_7",
      title: "Title",
    },
    {
      id: "prod_filter_8",
      title: "Title",
    },
    {
      id: "prod_filter_9",
      title: "Title",
    },
  ];
  const StyleFilterList = [
    {
      id: "style_filter_1",
      title: "Title",
    },
    {
      id: "style_filter_2",
      title: "Title",
    },
    {
      id: "style_filter_3",
      title: "Title",
    },
    {
      id: "style_filter_4",
      title: "Title",
    },
    {
      id: "style_filter_5",
      title: "Title",
    },
    {
      id: "style_filter_6",
      title: "Title",
    },
  ];
  const product_one = {
    id: "product_01",
    title: "Raven Hoodie With Black Colored Design",
    previewImages: [
      {
        id: "preview1",
        imgSource: staticImages.book_order,
      },
      {
        id: "preview2",
        imgSource: staticImages.book_order,
      },
      {
        id: "preview3",
        imgSource: staticImages.book_order,
      },
      {
        id: "preview4",
        imgSource: staticImages.book_order,
      },
      {
        id: "preview5",
        imgSource: staticImages.book_order,
      },
    ],
    rating: 3.5,
    comments_count: 120,
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["#3C4242", "#EDD146", "#EB84B0", "#9C1F35"],
    price: 63.0,
  };
  const productDescriptionTabHeads = [
    {
      id: "tab-description",
      tabHead: "tabDescription",
      tabText: "Mô tả sách",
      badgeValue: null,
      badgeColor: "",
    },
    {
      id: "tab-comments",
      tabHead: "tabComments",
      tabText: "Đánh giá",
      // badgeValue: 10,
      badgeColor: "purple",
    },
    // {
    //   id: "tab-QNA",
    //   tabHead: "tabQNA",
    //   tabText: "Question & Answer",
    //   badgeValue: 4,
    //   badgeColor: "outerspace",
    // },
  ];
  const cartItems = [
    {
      id: "C001",
      title: "Blue Flower Print Crop Top",
      color: "Yellow",
      size: "M",
      price: 29.0,
      quantity: 2,
      shipping: 0.0,
      imgSource: staticImages.book_order,
    },
    {
      id: "C002",
      title: "Blue Flower Print Crop Top",
      color: "Blue",
      size: "XL",
      price: 199.0,
      quantity: 5,
      shipping: 0.0,
      imgSource: staticImages.book_order,
    },
    {
      id: "C003",
      title: "Blue Flower Print Crop Top",
      color: "Yellow",
      size: "M",
      price: 123.0,
      quantity: 1,
      shipping: 5.0,
      imgSource: staticImages.book_order,
    },
    {
      id: "C004",
      title: "Blue Flower Print Crop Top",
      color: "Yellow",
      size: "M",
      price: 123.0,
      quantity: 1,
      shipping: 5.0,
      imgSource: staticImages.book_order,
    },
    {
      id: "C005",
      title: "Blue Flower Print Crop Top",
      color: "Yellow",
      size: "M",
      price: 123.0,
      quantity: 1,
      shipping: 5.0,
      imgSource: staticImages.book_order,
    },
  ];

  export {
    navMenuData,
    footerData,
    sideMenuData,
    bannerData,
    newArrivalData,
    feedbackData,
    orderData,
    books,
    ProductFilterList,
    StyleFilterList,
    product_one,
    productDescriptionTabHeads,
    cartItems
  }