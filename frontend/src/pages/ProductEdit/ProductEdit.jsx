import React, { useEffect, useState } from "react";
import "./EditProductModal.css";

import {
  getSingleProduct,
  updateProduct
} from "../../services/productService";

import { getSubCategories } from "../../services/subCategoryService";


export default function EditProductModal({
  open,
  productId,
  onClose,
  onUpdated
}) {


  const [productName,setProductName] = useState("");
  const [subCategory,setSubCategory] = useState("");
  const [description,setDescription] = useState("");

  const [subCategories,setSubCategories] = useState([]);

  const [variants,setVariants] = useState([]);

  const [image,setImage] = useState(null);

  const [loading,setLoading] = useState(false);



  useEffect(()=>{

    if(open && productId){

      fetchProduct();
      fetchSubCategories();

    }

  },[open,productId]);




  const fetchProduct = async()=>{

    try{

      const res = await getSingleProduct(productId);

      const product = res.data.product;


      setProductName(product.productName);

      setSubCategory(
        product.subCategory?._id || product.subCategory
      );

      setDescription(
        product.description || ""
      );


      setVariants(
        product.variants || []
      );


    }
    catch(error){

      console.log(error);

    }

  };





  const fetchSubCategories = async()=>{

    try{

      const res = await getSubCategories();

      setSubCategories(
        res.data.subCategories || []
      );

    }
    catch(error){

      console.log(error);

    }

  };






  const updateVariant = (index,field,value)=>{

    const updated=[...variants];

    updated[index][field]=value;

    setVariants(updated);

  };







  const handleSubmit = async()=>{


    try{


      setLoading(true);



      const formData = new FormData();



      formData.append(
        "productName",
        productName
      );


      formData.append(
        "subCategory",
        subCategory
      );


      formData.append(
        "description",
        description
      );


      formData.append(
        "variants",
        JSON.stringify(variants)
      );



      if(image){

        formData.append(
          "image",
          image
        );

      }



      const res = await updateProduct(
        productId,
        formData
      );


      console.log(res.data);



      alert("Product Updated Successfully");


      onUpdated();



      onClose();



    }
    catch(error){

      console.log(error);

      alert("Product Update Failed");

    }
    finally{

      setLoading(false);

    }


  };






  if(!open) return null;




  return (

    <div className="ep-overlay">


      <div
        className="ep-backdrop"
        onClick={onClose}
      />



      <div className="ep-modal">


        <h2>
          Edit Product
        </h2>




        <label>
          Product Name
        </label>

        <input
          className="ep-input"
          value={productName}
          onChange={(e)=>
            setProductName(e.target.value)
          }
        />





        <label>
          Sub Category
        </label>


        <select
          className="ep-input"
          value={subCategory}
          onChange={(e)=>
            setSubCategory(e.target.value)
          }
        >


          <option value="">
            Select Sub Category
          </option>


          {
            subCategories.map((sub)=>(

              <option
                key={sub._id}
                value={sub._id}
              >
                {sub.subCategoryName}
              </option>

            ))
          }


        </select>






        <label>
          Description
        </label>


        <input
          className="ep-input"
          value={description}
          onChange={(e)=>
            setDescription(e.target.value)
          }
        />






        <label>
          Variants
        </label>


        {
          variants.map((v,index)=>(


            <div
              className="ep-variant"
              key={index}
            >


              <input
                className="ep-small"
                value={v.ram}
                onChange={(e)=>
                  updateVariant(
                    index,
                    "ram",
                    e.target.value
                  )
                }
              />



              <input
                className="ep-small"
                value={v.price}
                onChange={(e)=>
                  updateVariant(
                    index,
                    "price",
                    e.target.value
                  )
                }
              />



              <input
                className="ep-small"
                value={v.qty}
                onChange={(e)=>
                  updateVariant(
                    index,
                    "qty",
                    e.target.value
                  )
                }
              />


            </div>


          ))
        }






        <label>
          Change Image
        </label>


        <input
          type="file"
          onChange={(e)=>
            setImage(
              e.target.files[0]
            )
          }
        />






        <div className="ep-actions">


          <button
            className="ep-update-btn"
            onClick={handleSubmit}
            disabled={loading}
          >

            {
              loading
              ?
              "UPDATING..."
              :
              "UPDATE"
            }

          </button>



          <button
            className="ep-cancel-btn"
            onClick={onClose}
          >
            DISCARD
          </button>



        </div>



      </div>



    </div>

  );

}
