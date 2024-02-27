import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage, getAllMessages, handleDeleteMess } from 'src/redux/slices/AdminSlice';
import { useEffect } from 'react';
import swal from 'sweetalert';

const { Item } = Menu;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMessages());
  }, []);

  const messages = useSelector((state) => state.admin.messages);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const handleDelete = (_id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Message has been deleted!', {
          icon: 'success',
        });
        dispatch(deleteMessage(_id));
        dispatch(handleDeleteMess(_id));
      } else {
        swal('Message is safe!');
      }
    });
  };

  const handleMoreOptions = (message) => {
    setSelectedMessage(message);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMessage('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['ascend', 'descend'],
      render: (createdAt) => {
        const date = new Date(createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedDate = `${hours < 10 ? '0' : ''}${hours}:${
          minutes < 10 ? '0' : ''
        }${minutes}, ${date.toLocaleDateString()} ${hours < 12 ? 'AM' : 'PM'}`;
        return formattedDate;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Item>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(record._id)}
                  style={{ width: '100%' }}
                >
                  Delete
                </Button>
              </Item>
              <Item>
                <Button
                  type="default"
                  onClick={() => handleMoreOptions(record.message)}
                  style={{ width: '100%' }}
                >
                  More
                </Button>
              </Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button>Actions</Button>
        </Dropdown>
      ),
    },
  ];

  const data = messages.map((message, index) => ({
    key: index.toString(),
    _id: message._id,
    name: message.name,
    createdAt: message.createdAt,
    email: message.email,
    message: message.message, // Add message to data
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} style={{paddingTop:"30px"}} />

      <Modal
        title="User Message"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <p>{selectedMessage}</p>
      </Modal>
    </>
  );
};

export default App;
