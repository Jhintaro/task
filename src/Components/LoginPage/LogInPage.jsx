import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import "./LoginPage.css";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("UserName is a required field")
    .min(3, "UserName must be at least 3 characters"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const LogIn = () => {
  return (
    <div>
      <Formik
        name="normal_login"
        className="login-form"
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <h1>Log In</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Input
                  prefix={
                    <UserOutlined className="site-form-item-icon form-control inp_text " />
                  }
                  placeholder="Enter UserName"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  id="username"
                />
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>
                <Input
                  prefix={
                    <LockOutlined className="site-form-item-ico form-control" />
                  }
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <Button type="submit" className="login-form-button signin">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default LogIn;
