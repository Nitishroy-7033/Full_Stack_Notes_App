import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    
    // This simulates an API call for authentication
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes: any email with password "password123" works
      if (values.password === 'password123') {
        message.success('Login successful!');
        // Store user info (normally would store a token)
        localStorage.setItem('user', JSON.stringify({ 
          email: values.email,
          name: values.email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${values.email.split('@')[0]}&background=random`
        }));
        navigate('/');
      } else {
        message.error('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card 
        className="w-full max-w-md shadow-md rounded-lg"
        title={
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-1">Sign in to your account</p>
          </div>
        }
      >
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400" />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400" />} 
              placeholder="Password" 
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600" 
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
