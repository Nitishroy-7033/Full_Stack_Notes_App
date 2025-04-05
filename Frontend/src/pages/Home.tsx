import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Input, 
  Button, 
  Space, 
  Avatar, 
  Typography, 
  Row, 
  Col,
  Radio, 
  Empty,
  Spin
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NoteCard, { NoteProps } from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';

const { Header, Content } = Layout;
const { Title } = Typography;

const sampleNotes: NoteProps[] = [
  {
    id: '1',
    title: 'Project Roadmap',
    description: 'Outline for the next sprint and key milestones for Q2. Need to assign tasks to team members.',
    date: 'Apr 2, 2025',
    category: 'projects',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Meeting Notes',
    description: 'Summary of the client meeting - they want to implement new features by the end of the month.',
    date: 'Apr 3, 2025',
    category: 'business'
  },
  {
    id: '3',
    title: 'Shopping List',
    description: 'Remember to buy: milk, eggs, bread, and coffee for the weekend.',
    date: 'Apr 1, 2025',
    category: 'personal'
  },
  {
    id: '4',
    title: 'Book Recommendations',
    description: 'List of books to read this summer: "Atomic Habits", "Deep Work", "The Psychology of Money".',
    date: 'Mar 28, 2025',
    category: 'personal',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '5',
    title: 'Website Redesign',
    description: 'Ideas for the landing page update - more white space, simplified navigation, new testimonials section.',
    date: 'Mar 25, 2025',
    category: 'projects'
  },
  {
    id: '6',
    title: 'Quarterly Budget',
    description: 'Financial review for Q1 and projections for Q2. Need to schedule a meeting with the finance team.',
    date: 'Mar 20, 2025',
    category: 'business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
  }
];

const Home: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userStr));
    
    // Simulate loading notes from API
    setTimeout(() => {
      setNotes(sampleNotes);
      setFilteredNotes(sampleNotes);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    // Filter notes based on category and search term
    let result = notes;
    
    if (category !== 'all') {
      result = result.filter(note => note.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(note => 
        note.title.toLowerCase().includes(term) || 
        note.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredNotes(result);
  }, [category, searchTerm, notes]);

  const handleAddNote = (newNote: NoteProps) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white px-4 md:px-8 flex items-center justify-between shadow-sm h-16">
        <div className="flex items-center flex-1">
          <Input
            placeholder="Search notes..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Space size="large">
          <Space>
            <div className="hidden md:block">
              <span className="text-gray-700">Hi, {user.name}</span>
            </div>
            <Avatar src={user.avatar} />
          </Space>
          
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            <span className="hidden md:inline-block">Add new note</span>
          </Button>
          
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </Space>
      </Header>
      
      <Content className="p-4 md:p-8">
        <div className="mb-8">
          <Title level={2} className="mb-6">Your Notes</Title>
          
          <Radio.Group 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            buttonStyle="solid"
            className="mb-6"
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="projects">Projects</Radio.Button>
            <Radio.Button value="business">Business</Radio.Button>
            <Radio.Button value="personal">Personal</Radio.Button>
          </Radio.Group>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : filteredNotes.length > 0 ? (
          <Row gutter={[16, 16]}>
            {filteredNotes.map((note) => (
              <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
                <NoteCard {...note} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty 
            description="No notes found" 
            className="py-12" 
          />
        )}
        
        <AddNoteModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onAddNote={handleAddNote}
        />
      </Content>
    </Layout>
  );
};

export default Home;
