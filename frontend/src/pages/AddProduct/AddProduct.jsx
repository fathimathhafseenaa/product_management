const handleSubmit = async()=>{

  try{

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


    // Multiple Images Upload
    images.forEach((image)=>{

      formData.append(
        "image",
        image
      );

    });


    const res = await addProduct(formData);


    console.log(res.data);


    alert("Product Added Successfully");


    onClose();


  }
  catch(error){

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Product Add Failed"
    );

  }
  finally{

    setLoading(false);

  }

};
