import React from 'react';
import { Card, Typography, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: 'projects' | 'business' | 'personal';
  image?: string;
}

const categoryColors = {
  'projects': 'category-blue',
  'business': 'category-orange',
  'personal': 'category-purple'
};

const NoteCard: React.FC<NoteProps> = ({ title, content, createdAt, category, image }) => {
  return (
    <Card 
      className="note-card rounded-lg overflow-hidden h-full"
      cover={image && <div className="h-40 overflow-hidden">
        <img 
          alt={title} 
          src={image} 
          className="w-full h-full object-cover" 
        />
      </div>}
    >
      <div className="flex justify-between items-start mb-2">
        <Title level={4} className="!mb-0 !mt-0">
          {title}
        </Title>
        <div className={`w-3 h-3 rounded-full ${categoryColors[category]}`} />
      </div>
      
      <Space direction="vertical" className="w-full" size={12}>
        <div className="flex text-gray-500 text-sm items-center">
          <CalendarOutlined className="mr-1" />
          <Text type="secondary">{createdAt}</Text>
        </div>
        
        <Text className="line-clamp-3">{content}</Text>
      </Space>
    </Card>
  );
};

export default NoteCard;
