import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  HStack,
  Text,
  Spacer,
  IconButton,
} from '@chakra-ui/react';


import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { useContext, useEffect, useState } from 'react';
import Pagination from './Pagination';
import { UsersContext } from '../Contexts/UsersContext';


export default function DataTable() {
  const context = useContext(UsersContext);
  const { users, setUsers, checkboxId, setCheckbox } = context;

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [editUser, setEditUser] = useState(null);
  const [checkedPage, setCheckedPage] = useState([]);


  const changePage = page => {
    setCurrentPage(page);
  };


  const handleCheckboxChange = id => {
    // Check if the checkbox is already selected
    if (checkboxId.includes(id)) {
      // If selected, remove it from the array
      setCheckbox(prev => prev.filter(item => item !== id));
    } else {
      // If not selected, add it to the array
      setCheckbox(prev => [...prev, id]);
    }
  };

  const handleAllCheckbox = e => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const selectedUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    if (checkedPage.includes(currentPage)) {
      const checked = [];
      selectedUsers.map(item => checked.pop(item.id));
      setCheckbox(checked);
      setCheckedPage(prev => prev.filter(item => item !== currentPage));
    } else {
      const checked =checkboxId;
      selectedUsers.map(item => checked.push(item.id));
      setCheckbox(checked);
      setCheckedPage(prev => [...prev, currentPage]);
    }
  };

  
  const handleDeleteOneUser = deleteThisId => {
    const newUsers = users.filter(item => item.id !== deleteThisId);
    setUsers(newUsers);
  };

  const handleEdit = id => {
    if (editUser === id) {
      setEditUser(null);
    } else {
      setEditUser(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const jsonData = await data.json();
      setUsers(jsonData);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <TableContainer>
        <Table variant="simple" cursor="pointer">
          <Thead>
            <Tr>
              <Th>
                {' '}
                <Checkbox
                  isChecked={checkedPage.includes(currentPage)}
                  onChange={handleAllCheckbox}
                  size="md"
                  colorScheme="blue"
                />
              </Th>
              <Th >Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map(item => (
              <Tr key={item.key} colorScheme="grey">
                <Td>
                  <Checkbox
                    isChecked={checkboxId.includes(item.id)}
                    onChange={() => {
                      handleCheckboxChange(item.id);
                    }}
                    size="md"
                    colorScheme="blue"
                  />
                </Td>
                <Td
                  cursor={editUser !== item.id ? 'pointer' : 'auto'}
                  contentEditable={editUser === item.id ? true : false}
                >
                  {item.name}
                </Td>
                <Td
                  cursor={editUser !== item.id ? 'pointer' : 'auto'}
                  contentEditable={editUser === item.id ? true : false}
                >
                  {item.email}
                </Td>
                <Td
                  cursor={editUser !== item.id ? 'pointer' : 'auto'}
                  contentEditable={editUser === item.id ? true : false}
                >
                  {item.role}
                </Td>
                <Td>
                  <HStack>
                    <IconButton
                      bg="white"
                      icon={editUser !== item.id ? <EditIcon /> : <CheckIcon color='green' />}
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    />
                    <IconButton
                      bg="white"
                      color="red"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        handleDeleteOneUser(item.id);
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack>
        <Text ml="1em">
          {checkboxId.length} is selected from {users.length}
        </Text>
        <Spacer />
        <Pagination
          totalResult={users.length}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          changePage={changePage}
        />
      </HStack>
    </>
  );
}
