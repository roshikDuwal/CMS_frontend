import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { AxiosResponse } from 'axios';
import { UseMutationResult } from 'react-query';


interface DeleteProps {
    isDeleteOpen: boolean;
    onDeleteClose: () => void;
    deleteUser: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>;
    id: string;
    setSelectedUserId: React.Dispatch<React.SetStateAction<string>>
}

const DeleteModal = ({ isDeleteOpen, onDeleteClose, deleteUser, id, setSelectedUserId }: DeleteProps) => {
    return (
        <Modal isOpen={isDeleteOpen} onClose={() => { onDeleteClose(); setSelectedUserId(""); }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are You Sure?</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button colorScheme='red' onClick={() => deleteUser.mutate(id)} mr={3} >
                        Delete
                    </Button>
                    <Button variant='ghost' onClick={onDeleteClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteModal