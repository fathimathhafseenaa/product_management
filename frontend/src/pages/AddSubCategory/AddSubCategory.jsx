import React, { useEffect, useState } from "react";
import "./AddSubCategory.css";
import { getCategories } from "../../services/categoryService";
import { addSubCategory } from "../../services/subCategoryService";


export default function AddSubCategoryModal({
  open = true,
  onClose,
  onAdded,
}) {

  const [category, setCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    if (open) {

      fetchCategories();

    }

    if (!open) {

      setCategory("");
      setSubCategoryName("");

    }

  }, [open]);




  // Get Categories

  const fetchCategories = async () => {

    try {

      const res = await getCategories();

      setCategories(
        res.data.categories || []
      );

    }
    catch (error) {

      console.log(
        "CATEGORY FETCH ERROR:",
        error.response?.data || error.message
      );

    }

  };





  // Add Sub Category

  const handleSubmit = async () => {


    if (!category || !subCategoryName.trim()) {

      alert("Please fill all fields");
      return;

    }



    try {


      setLoading(true);



      const res = await addSubCategory({

        category,

        subCategoryName

      });



      console.log(res.data);



      alert(
        "Sub Category Added Successfully"
      );



      setCategory("");

      setSubCategoryName("");



      if (onAdded) {

        onAdded();

      }
      else {

        onClose();

      }



    }
    catch (error) {


      console.log(
        "SUB CATEGORY ERROR:",
        error.response?.data || error.message
      );


      alert(
        error.response?.data?.message ||
        "Sub Category Add Failed"
      );


    }
    finally {

      setLoading(false);

    }


  };





  if (!open) return null;



  return (

    <div className="asc-overlay">


      <div
        className="asc-backdrop"
        onClick={onClose}
      />



      <div className="asc-modal">


        <h2 className="asc-heading">
          Add Sub Category
        </h2>




        <select

          className="asc-input asc-select"

          value={category}

          onChange={(e) =>
            setCategory(e.target.value)
          }

        >


          <option value="">
            Select category
          </option>



          {
            categories.map((cat) => (

              <option
                key={cat._id}
                value={cat._id}
              >

                {cat.categoryName}

              </option>

            ))
          }



        </select>





        <input

          type="text"

          className="asc-input"

          placeholder="Enter sub category name"

          value={subCategoryName}

          onChange={(e) =>
            setSubCategoryName(
              e.target.value
            )
          }

        />





        <div className="asc-actions">



          <button

            className="asc-add-btn"

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

            className="asc-discard-btn"

            onClick={onClose}

          >

            DISCARD

          </button>




        </div>




      </div>


    </div>

  );

}