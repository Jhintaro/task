import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input} from "antd";
import "./ToDoForm.css";

const onFinish = () => {};
const AddField = () => {
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.List name="descreption">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div
                key={key}
                style={{
                  marginBottom: 8,
                }}
              >
                <div>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
                <Input
                  className="input"
                  placeholder="Descreption"
                  name="descreption"
                  style={{ width: 270 }}
                ></Input>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              ></Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};
export default AddField;
