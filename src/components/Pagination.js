import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { IconButton, HStack, Box, Center } from '@chakra-ui/react';

export default function Pagination(props) {
  
  const moveToPreviousPage = e => {
    if (props.currentPage > 1) {
      props.changePage(props.currentPage - 1);
    }
  };

  const moveToNextPage = e => {
    if (props.currentPage < props.totalResult / props.usersPerPage) {
      props.changePage(props.currentPage + 1);
    }
  };

  const moveToDesiredPage = num => {
    props.changePage(num);
  };

  return (
    <>
      <HStack mt="1em" mr="1em">
        <IconButton
          bg="white"
          icon={<ArrowLeftIcon />}
          onClick={moveToPreviousPage}
        />
        {(() => {
          const boxes = [];
          for (let i = 0; i < props.totalResult / props.usersPerPage; i++) {
            boxes.push(
              <Box
                as="button"
                _active={
                  i + 1 === props.currentPage
                    ? { bg: 'gray.500' }
                    : { bg: 'white' }
                }
                onClick={() => {
                  moveToDesiredPage(i + 1);
                }}
                key={i}
                w="2em"
                h="2em"
                borderWidth="2px"
                borderColor="gray.200"
                rounded="md"
              >
                <Center>{i + 1}</Center>
              </Box>
            );
          }
          return boxes;
        })()}
        <IconButton
          bg="white"
          icon={<ArrowRightIcon />}
          onClick={moveToNextPage}
        />
      </HStack>
    </>
  );
}
