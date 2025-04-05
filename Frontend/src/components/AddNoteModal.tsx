import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';

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
      const values = await form.validateFields();
      setLoading(true);

      // Simulate API request
      setTimeout(() => {
        const newNote = {
          id: Date.now().toString(),
          title: values.title,
          description: values.description,
          category: values.category,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
        };

        onAddNote(newNote);
        setLoading(false);
        message.success('Note added successfully!');
        form.resetFields();
        onCancel();
      }, 1000);
    } catch (error) {
      console.error('Validation failed:', error);
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
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea rows={4} placeholder="Enter note description" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            <Option value="projects">Projects</Option>
            <Option value="business">Business</Option>
            <Option value="personal">Personal</Option>
          </Select>
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
