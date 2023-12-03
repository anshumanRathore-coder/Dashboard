//All imports
import { Input, HStack, Spacer, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { UsersContext } from '../Contexts/UsersContext';
import { useContext, useState } from 'react';

export default function Navbar() {
  //hooks
  const { users, setUsers, checkboxId } = useContext(UsersContext);
  const [searchKeyword, setSearchKeyword] = useState(null);

  //This function delete only selected users
  const deleteSelectedUsers = () => {
    const newUsers = users.filter(item => !checkboxId.includes(item.id));
    setUsers(newUsers);
  };

  //It handle change of the input
  const handleChange = e => {
    setSearchKeyword(e.target.value);
  };

  //when you hit enter this funciton tackel it
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      const filteredData = users.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
      setUsers(filteredData);
    }
  };

  return (
    <>
      <HStack mt="1em" ml="1em" mr="1em">
        <Input
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          placeholder="Search here ..."
          size="md"
          w="15rem"
        />
        <Spacer />
        <IconButton
          onClick={deleteSelectedUsers}
          icon={<DeleteIcon boxSize={7} />}
          bg="white"
          color="red"
          cursor="pointer"
        />
      </HStack>
    </>
  );
}
