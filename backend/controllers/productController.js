const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");


// Add Product
const addProduct = async (req, res) => {
  try {

    const {
      productName,
      subCategory,
      description,
      variants,
    } = req.body;


    // Check Sub Category
    const subCategoryExists = await SubCategory.findById(subCategory);


    if (!subCategoryExists) {
      return res.status(404).json({
        success:false,
        message:"Sub Category not found"
      });
    }


    // Get category from subcategory
    const category = subCategoryExists.category;


  let images = [];

if(req.files){
  images = req.files.map((file)=>file.filename);
}



    const product = await Product.create({

      productName,

      category,

      subCategory,

      description,

      image,

      variants: JSON.parse(variants)

    });



    res.status(201).json({

      success:true,

      message:"Product added successfully",

      product

    });



  } catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:error.message

    });

  }
};



// Get All Products
const getProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("subCategory");


    res.status(200).json({

      success: true,

      count: products.length,

      products,

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};




// Update Product
const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;


    const {
      productName,
      subCategory,
      description,
      variants,
    } = req.body;



    let updateData = {

      productName,

      subCategory,

      description,

      variants: JSON.parse(variants),

    };



    // New image upload
    if (req.file) {

      updateData.image = req.file.filename;

    }



    const product = await Product.findByIdAndUpdate(

      id,

      updateData,

      { new:true }

    );



    if (!product) {

      return res.status(404).json({

        success:false,

        message:"Product not found",

      });

    }



    res.status(200).json({

      success:true,

      message:"Product updated successfully",

      product,

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }
};




// Delete Product
const deleteProduct = async (req,res)=>{

  try{


    const {id}=req.params;


    const product = await Product.findByIdAndDelete(id);



    if(!product){

      return res.status(404).json({

        success:false,

        message:"Product not found",

      });

    }



    res.status(200).json({

      success:true,

      message:"Product deleted successfully",

    });



  }
  catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};




// Get Single Product
const getSingleProduct = async(req,res)=>{

  try{


    const product = await Product.findById(req.params.id)
      .populate("subCategory");



    if(!product){

      return res.status(404).json({

        success:false,

        message:"Product not found",

      });

    }



    res.status(200).json({

      success:true,

      product,

    });



  }
  catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};




module.exports = {

  addProduct,

  getProducts,

  updateProduct,

  deleteProduct,

  getSingleProduct,

};
