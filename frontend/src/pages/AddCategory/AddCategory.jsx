import React, { useState } from "react";
import "./AddCategory.css";
import { addCategory } from "../../services/categoryService";

export default function AddCategoryModal({ open = true, onClose, onAdded }) {

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {

    if (!categoryName.trim()) {
      alert("Please enter category name");
      return;
    }


    try {

      setLoading(true);


      const res = await addCategory({
        categoryName
      });


      console.log(res.data);


      alert("Category Added Successfully");


      setCategoryName("");


      if (onAdded) {
        onAdded();
      }
      else {
        onClose();
      }


    }
    catch (error) {

      console.log(
        "CATEGORY ERROR:",
        error.response?.data || error.message
      );


      alert(
        error.response?.data?.message ||
        "Category Add Failed"
      );

    }
    finally {

      setLoading(false);

    }

  };



  if (!open) return null;



  return (

    <div className="ac-overlay">


      <div
        className="ac-backdrop"
        onClick={onClose}
      />



      <div className="ac-modal">


        <h2 className="ac-heading">
          Add Category
        </h2>



        <input
          type="text"
          className="ac-input"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
        />



        <div className="ac-actions">


          <button
            className="ac-add-btn"
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
            className="ac-discard-btn"
            onClick={onClose}
          >

            DISCARD

          </button>


        </div>



      </div>


    </div>

  );

}