import * as yup from "yup";
import { Formik} from 'formik';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import "./SignUp.css";


const SignUp = () => {
    const schema = yup.object({
        username: yup.string().required("Username Required!"),
        password: yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
        confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Password must match!")
      .required("Confirm password is reqired!")
    })
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
        <div className='signup'>
          <div className='form'>
            <h1>Sign up</h1>
        <Form noValidate onSubmit={handleSubmit}>
        <Input prefix={<UserOutlined className="site-form-item-icon form-control inp_text " />} 
        placeholder="Enter UserName"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        id='username' />
        <p className="error">
                  {errors.username && touched.username && errors.username}
        </p>
        <Input
          prefix={<LockOutlined className="site-form-item-ico form-control" />}
          type="password"
          name='password'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          placeholder="Enter password"
        />
        <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
        <Button className = "register" type="submit">
          Register
        </Button>
      </Form>
      </div>
      </div>
        )}
    </Formik>
        </div>
      );
    };
export default SignUp;