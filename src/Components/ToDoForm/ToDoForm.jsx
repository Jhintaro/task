import { Button, Form, Input, DatePicker } from "antd";
import { Formik, FieldArray, Field } from "formik";
import * as yup from "yup";
import AddImage from "./Upload";
import AddField from "./AddNewField";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./ToDoForm.css";
import axios from "axios";
const ToDo = () => {
  const authToken =
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwibmFtZSI6InVzZXIyIiwibmJmIjoxNzEwMTM4MTQ4LCJleHAiOjE3MTAxNDE3NDgsImlhdCI6MTcxMDEzODE0OH0.LnYS5BYTAC57rGXiEvaVyxTGkprK9XPdwPH28mF6KEE66B18LcHFH8F-L3BGwIbdYnFk1nsV5rdxwy-XKkZjKQ";
  const authTokenWithBearer = `Bearer ${authToken}`;
  const schema = yup.object({
    title: yup.string().required("Title Is Required!"),
    description: yup.array().of(yup.string()),
  });
  const handleSubmit = (values) => {
    console.log("Triggered");
    axios
      .post("http://207.180.235.145/Tasks", values, {
        headers: {
          Authorization: authTokenWithBearer,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("Response", response.data);
        alert("Form Submitted Successfully");
      })
      .catch((error) => {
        console.error("Error", error);
        alert("Failed To Submit Form");
      });
  };

  return (
    <div className="form">
      <Formik
        initialValues={{
          title: "",
          description: [""],
          image: null,
          dueDate: null,
        }}
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
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
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

            <p></p>
            <FieldArray name="description">
              {(arrayHelpers) => (
                <div>
                  {values.description.map((description, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Field
                        style={{ width: "calc(100% - 24px)" }}
                        className="input"
                        name={`description.${index}`}
                        placeholder={`Enter Description ${index + 1}`}
                      />

                      <MinusCircleOutlined
                        onClick={() => arrayHelpers.remove(index)}
                        style={{ marginLeft: "8px" }}
                      />
                    </div>
                  ))}
                  <Button
                    style={{ width: "100%" }}
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    icon={<PlusOutlined />}
                  >
                    Add Description
                  </Button>
                </div>
              )}
            </FieldArray>
            <p className="error">
              {errors.description && touched.description && errors.description}
            </p>
            <AddImage
              style={{ width: "100%" }}
              className="input"
              name="image"
              value={values.image}
              onBlur={handleBlur}
            ></AddImage>
            <p></p>
            <Button className="submit input" onClick={handleSubmit}>
              Add To Your Lists
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ToDo;
