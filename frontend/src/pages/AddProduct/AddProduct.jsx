import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import { addProduct } from "../../services/productService";
import { getSubCategories } from "../../services/subCategoryService";


export default function AddProductModal({ open = true, onClose }) {


  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  const [subCategories, setSubCategories] = useState([]);

  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      ram: "",
      price: "",
      qty: 1
    }
  ]);

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    fetchSubCategories();

  }, []);



  const fetchSubCategories = async () => {

    try {

      const res = await getSubCategories();

      setSubCategories(
        res.data.subCategories || []
      );

    }
    catch (error) {

      console.log(error);

    }

  };




  const updateVariant = (id, field, value) => {

    setVariants((prev) =>

      prev.map((item) =>

        item.id === id
          ?
          {
            ...item,
            [field]: value
          }
          :
          item

      )

    );

  };





  const changeQty = (id, value) => {

    setVariants((prev) =>

      prev.map((item) =>

        item.id === id
          ?
          {
            ...item,
            qty: Math.max(0, item.qty + value)
          }
          :
          item

      )

    );

  };





  const addVariantRow = () => {

    setVariants((prev) => [

      ...prev,

      {
        id: Date.now(),
        ram: "",
        price: "",
        qty: 1
      }

    ]);

  };






  const handleSubmit = async () => {


    try {


      setLoading(true);


      const formData = new FormData();


      formData.append(
        "productName",
        title
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



      if (image) {

        formData.append(
          "image",
          image
        );

      }





      const res = await addProduct(formData);


      console.log(res.data);


      alert("Product Added Successfully");


      onClose();


    }
    catch (error) {

      console.log(error);

      alert("Product Add Failed");

    }
    finally {

      setLoading(false);

    }


  };





  if (!open) return null;



  return (

    <div className="ap-overlay">


      <div
        className="ap-backdrop"
        onClick={onClose}
      />



      <div className="ap-modal">


        <h2 className="ap-heading">
          Add Product
        </h2>



        <div className="ap-form">



          <div className="ap-row">

            <label className="ap-label">
              Title :
            </label>


            <input
              type="text"
              className="ap-input ap-input-wide"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>





          <div className="ap-variants-block">


            <label className="ap-label">
              Variants :
            </label>



            {
              variants.map((v) => (


                <div
                  className="ap-variant-row"
                  key={v.id}
                >


                  <span className="ap-sublabel">
                    RAM:
                  </span>


                  <input
                    className="ap-input ap-input-sm"
                    value={v.ram}
                    onChange={(e) =>
                      updateVariant(
                        v.id,
                        "ram",
                        e.target.value
                      )
                    }
                  />



                  <span className="ap-sublabel">
                    Price:
                  </span>


                  <input
                    className="ap-input ap-input-sm"
                    value={v.price}
                    onChange={(e) =>
                      updateVariant(
                        v.id,
                        "price",
                        e.target.value
                      )
                    }
                  />



                  <span className="ap-sublabel">
                    QTY:
                  </span>



                  <button
                    onClick={() =>
                      changeQty(v.id, -1)
                    }
                  >
                    -
                  </button>


                  <span>
                    {v.qty}
                  </span>


                  <button
                    onClick={() =>
                      changeQty(v.id, 1)
                    }
                  >
                    +
                  </button>



                </div>


              ))

            }



            <button
              className="ap-add-variant-btn"
              onClick={addVariantRow}
            >
              Add variants
            </button>



          </div>






          <div className="ap-row">


            <label className="ap-label">
              Sub category :
            </label>


            <select
              className="ap-input ap-input-wide"
              value={subCategory}
              onChange={(e) =>
                setSubCategory(e.target.value)
              }
            >

              <option value="">
                Select
              </option>


              {
                subCategories.map((sub) => (

                  <option
                    key={sub._id}
                    value={sub._id}
                  >
                    {sub.subCategoryName}
                  </option>

                ))
              }


            </select>


          </div>






          <div className="ap-row">

            <label className="ap-label">
              Description :
            </label>


            <input
              className="ap-input ap-input-wide"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>







          <div className="ap-row">


            <label className="ap-label">
              Upload image:
            </label>


            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />


          </div>



        </div>






        <div className="ap-actions">


          <button
            className="ap-add-btn"
            onClick={handleSubmit}
            disabled={loading}
          >

            {
              loading
                ?
                "ADDING..."
                :
                "ADD"
            }

          </button>



          <button
            className="ap-discard-btn"
            onClick={onClose}
          >
            DISCARD
          </button>



        </div>



      </div>


    </div>

  );

}