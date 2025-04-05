import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;

interface AddNoteModalProps {
  visible: boolean;
  onCancel: () => void;
  onAddNote: (note: unknown) => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ visible, onCancel, onAddNote }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const bodyData = {
        title: values.title,
        content: values.content,
        authorId:"NitishKumar",
      }
      const response = await axios.post('http://localhost:3000/notes', bodyData);
      if (response.status === 201) {
        message.success('Note added successfully!');
      }
      else{
        message.error('Failed to add note. Please try again.');
      }
      onCancel();
      onAddNote(response.data);
      form.resetFields();
      console.log('Form values:', values);
      setLoading(false);
    } catch (error) {
      console.error('Validation failed:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Note"
      open={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
      className="rounded-lg"
    >
      <Form
        form={form}
        layout="vertical"
        name="add_note_form"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter note title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter a content' }]}
        >
          <TextArea rows={4} placeholder="Enter note content" />
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end">
          <Button onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button 
            type="primary" 
            onClick={handleSubmit} 
            loading={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;
