import { Button, Form, Input, DatePicker } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import AddImage from "../ToDoForm/Upload";
import AddField from "../ToDoForm/AddNewField";
import { Checkbox } from "antd";
import { useState, useEffect } from "react";
import "./Update.css";
import axios from "axios";

const Edit = ({itemIdToEdit}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: [],
    image: null,
    dueDate: null,
    itemId: null, // New field to hold the item ID
  });
  const authToken =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmFtZSI6InVzZXIyIiwibmJmIjoxNzEwMTM4MTQ4LCJleHAiOjE3MTAxNDE3NDgsImlhdCI6MTcxMDEzODE0OH0.LnYS5BYTAC57rGXiEvaVyxTGkprK9XPdwPH28mF6KEE66B18LcHFH8F-L3BGwIbdYnFk1nsV5rdxwy-XKkZjKQ";
  const authTokenWithBearer = `Bearer ${authToken}`;
  const schema = yup.object({
    title: yup.string().required("Title Is Required!"),
    description: yup.array().of(yup.string()),
  });
  // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const response = await axios.get(`http://207.180.235.145/tasks/1`, {
  //         headers: {
  //           Authorization: authTokenWithBearer,
  //         },
  //       });
  //       setTask(response.data);
  //     } catch (error) {
  //       console.error("Error fetching task:", error);
  //     }
  //   };
  //   fetchTask();
  // }, [id]); // Fetch task whenever ID changes

  const fetchItemDetails = async (itemId) => {
    try {
      const response = await axios.get(`http://207.180.235.145/Tasks/${itemId}`, {
        headers: {
          Authorization: authTokenWithBearer,
        },
      });
      const item = response.data;
      // Update formData with item details
      setFormData({
        title: item.title,
        description: item.description,
        image: item.image,
        dueDate: item.dueDate,
        itemId: itemId, // Set the itemId in formData
      });
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };
  // Fetch item details if itemIdToEdit is provided
  if (itemIdToEdit) {
    fetchItemDetails(itemIdToEdit);
  }
  
  // const handleSubmit = (updatedTaskData) => {
  //   console.log("Triggered");
  //   axios
  //     .put("http://207.180.235.145/Tasks/", updatedTaskData, {
  //       headers: {
  //         Authorization: authTokenWithBearer,
  //         "Content-Type": "multipart/form-data",
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Response", response.data);
  //       alert("Form Updated Successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error", error);
  //       alert("Failed To Update Form");
  //     });
  // };
  const handleSubmit = async (values) => {
    console.log("Triggered");
    try {
      if (values.itemId) {
        // Editing existing item
        await axios.put(`http://207.180.235.145/Tasks/${values.itemId}`, values, {
          headers: {
            Authorization: authTokenWithBearer,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
        console.log("Item updated successfully!");
        alert("Item updated successfully!");
      } else {
        // Creating new item
        await axios.post("http://207.180.235.145/Tasks", values, {
          headers: {
            Authorization: authTokenWithBearer,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
        console.log("Item added successfully!");
        alert("Item added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form!");
    }
  };

  return (
    <div className="form">
      <Formik
        initialValues={formData}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form noValidate onSubmit={handleSubmit} autoComplete="off">
            <p></p>
            <Input
              className="input"
              placeholder="Enter title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            ></Input>
            <p className="error">
              {errors.title && touched.title && errors.title}
            </p>
            <DatePicker
              name="dueDate"
              value={values["dueDate"]}
              onChange={(e) => setFieldValue("dueDate", e)}
              className="input"
              picker="month"
              onFocus={(_, info) => {
                console.log("Focus:", info.range);
              }}
              onBlur={(_, info) => {
                console.log("Blur:", info.range);
              }}
              onDataChange={(date) => setFieldValue("dueDate", date)}
              onTouch={setFieldTouched}
            />
            <Input
              className="input"
              placeholder="description"
              name="description"
              onChange={(e) => {
                const descriptionArray = e.target.value.split(",");
                setFieldValue("description", descriptionArray);
              }}
              onBlur={handleBlur}
              value={values.description.join(",")}
            ></Input>
            <p className="error">
              {errors.description && touched.description && errors.description}
            </p>
            <p></p>
            <AddImage
              className="input"
              name="image"
              value={values.image}
            ></AddImage>
            <p></p>
            <Checkbox
              onChange={(e) => setFieldValue("completed", e.target.checked)}
            >
              Completed
            </Checkbox>
            <p></p>
            <Button className="submit input" onClick={handleSubmit}>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Edit;
