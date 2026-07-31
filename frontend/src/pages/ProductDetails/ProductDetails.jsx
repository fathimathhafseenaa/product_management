import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";

import { getSingleProduct } from "../../services/productService";
import { addToWishlist } from "../../services/wishlistService";

import ItemsPanel from "../whishlist/Wishlist";
import EditProductModal from "../ProductEdit/ProductEdit";


export default function ProductDetails() {


  const { id } = useParams();

  const navigate = useNavigate();



  const [product, setProduct] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);



  // Wishlist modal

  const [showWishlist, setShowWishlist] = useState(false);



  // Edit Modal

  const [showEditProduct, setShowEditProduct] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);




  useEffect(() => {

    fetchProduct();

  }, []);





  const fetchProduct = async () => {


    try {


      const res = await getSingleProduct(id);



      setProduct(res.data.product);




      if(res.data.product.variants.length > 0){


        setSelectedVariant(
          res.data.product.variants[0]
        );


      }



    }
    catch(error){


      console.log(error);


    }
    finally{


      setLoading(false);


    }


  };






  // Wishlist Add


  const handleWishlist = async () => {


    try {


      const userId = localStorage.getItem("userId");



      const res = await addToWishlist({

        userId,

        productId: product._id

      });



      console.log(
        "Wishlist response:",
        res.data
      );



      alert("Product added to Wishlist");



    }
    catch(error){


      console.log(error);



      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );


    }


  };






  const decrease = () => {


    if(qty > 1){

      setQty(qty - 1);

    }


  };





  const increase = () => {


    if(
      selectedVariant &&
      qty < selectedVariant.qty
    ){


      setQty(qty + 1);


    }


  };
    if (loading) {

    return (

      <div className="pd-page">

        <h2 style={{
          textAlign:"center",
          marginTop:"100px"
        }}>

          Loading...

        </h2>

      </div>

    );

  }




  if (!product) {

    return (

      <div className="pd-page">

        <h2 style={{
          textAlign:"center",
          marginTop:"100px"
        }}>

          Product Not Found

        </h2>

      </div>

    );

  }





  return (

    <div className="pd-page">


      <div className="pd-container">





        {/* Navbar */}


        <header className="pd-navbar">


          <div className="pd-search-wrap">


            <input

              type="text"

              placeholder="Search any things"

              className="pd-search-input"

            />



            <button className="pd-search-btn">

              Search

            </button>


          </div>





          <div className="pd-nav-actions">



            <span

              className="pd-nav-icon"

              onClick={() => setShowWishlist(true)}

            >

              ♡

            </span>





            <span

              className="pd-nav-link"

              onClick={() => setShowWishlist(true)}

            >

              Wishlist

            </span>







            <span className="pd-nav-icon">

              🛒

            </span>



            <span className="pd-nav-link">

              Cart

            </span>



          </div>



        </header>








        <div className="pd-body">





          <div className="pd-breadcrumb">

            Home &gt; Product Details

          </div>








          <div className="pd-content">





            {/* Gallery */}



            <div className="pd-gallery">



              <div className="pd-main-image">


                <img

                  src={`http://localhost:5000/uploads/${product.image}`}

                  alt={product.productName}

                  className="pd-main-img"

                />


              </div>






              <div className="pd-thumbs">


                <div className="pd-thumb">


                  <img

                    src={`http://localhost:5000/uploads/${product.image}`}

                    alt={product.productName}

                    className="pd-thumb-img"

                  />


                </div>


              </div>



            </div>









            {/* Details */}



            <div className="pd-details">





              <h1 className="pd-name">

                {product.productName}

              </h1>







              <div className="pd-price">

                ₹ {selectedVariant?.price}

              </div>







              <div className="pd-availability">


                Availability :


                <span className="pd-instock">


                  {
                    selectedVariant?.qty > 0

                    ? " In Stock"

                    : " Out of Stock"
                  }


                </span>


              </div>






              <div className="pd-stock-warning">


                Only {selectedVariant?.qty} products left


              </div>







              <hr className="pd-divider" />







              <div className="pd-ram-row">


                <span className="pd-label">

                  RAM :

                </span>





                {
                  product.variants.map((item)=>(


                    <button

                      key={item._id}


                      className={

                        selectedVariant?._id === item._id

                        ? "pd-ram-btn pd-ram-btn-active"

                        : "pd-ram-btn"

                      }



                      onClick={()=>{


                        setSelectedVariant(item);

                        setQty(1);


                      }}



                    >

                      {item.ram}


                    </button>


                  ))
                }



              </div>






              <div className="pd-qty-row">


                <span className="pd-label">

                  Quantity :

                </span>




                <div className="pd-qty-control">



                  <button

                    className="pd-qty-btn"

                    onClick={decrease}

                  >

                    -

                  </button>





                  <span className="pd-qty-value">

                    {qty}

                  </span>





                  <button

                    className="pd-qty-btn"

                    onClick={increase}

                  >

                    +

                  </button>




                </div>



              </div>
                            <div className="pd-actions">





                {/* Edit Button - Modal Open */}


                <button

                  className="pd-edit-btn"

                  onClick={() => {

                    setSelectedProductId(product._id);

                    setShowEditProduct(true);

                  }}

                >

                  Edit Product

                </button>







                <button

                  className="pd-buy-btn"

                >

                  Buy Now

                </button>







                {/* Wishlist Add Button */}



                <button

                  className="pd-heart-btn"

                  onClick={handleWishlist}

                >

                  ♡

                </button>






              </div>





            </div>





          </div>






        </div>







        {/* Wishlist Side Panel */}



        <ItemsPanel

          open={showWishlist}

          onClose={() => setShowWishlist(false)}

        />








        {/* Edit Product Modal */}



        <EditProductModal


          open={showEditProduct}


          productId={selectedProductId}



          onClose={() => {


            setShowEditProduct(false);


            setSelectedProductId(null);


          }}



          onUpdated={() => {


            fetchProduct();


          }}



        />







      </div>



    </div>



  );


}