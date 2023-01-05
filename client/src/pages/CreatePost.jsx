import React, { useContext, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const initialValues = {  // initialValues for Formik
    title: "",
    postText: "",
  };

  useEffect(() => {
    if(!localStorage.getItem("accessToken")) { 
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    // Yup Validation
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
       headers: { accessToken: localStorage.getItem("accessToken") }
    }).then(() => {
      navigate("/");
    });
  };
 
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title" //from DB
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;