import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, LightMode, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { AdminServiceElemProps } from '../../../../pages/admin/AdminService';
import LabelInput from '../../../shared/LabelInput';

interface AddProps {
    isOpen: boolean;
    onClose: () => void;
    addUser: SubmitHandler<AdminServiceElemProps>;
    handleSubmit: UseFormHandleSubmit<AdminServiceElemProps, undefined>;
    register: UseFormRegister<AdminServiceElemProps>;
    errors: FieldErrors<AdminServiceElemProps>;
    control: Control<AdminServiceElemProps, any>;
    isLoading:boolean;
}

const AddModal = ({ isOpen, onClose, control, errors, handleSubmit, addUser, register, isLoading}: AddProps) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent width={"80vw"}>
                    <Flex p={2} m={5} alignItems={"center"} justifyContent={"center"}>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <ModalHeader>Add Service</ModalHeader>
                            <ModalCloseButton />

                            <form style={{ width: "100%" }} onSubmit={handleSubmit((data) => addUser(data))}>

                                <LabelInput
                                    register={register}
                                    errors={errors}
                                    label={"Enter Service"}
                                    type={"text"}
                                    registerName={"service"}
                                    placeHolder={"Enter your Service"}
                                    errorMessage={"Please Enter Service"}
                                />

                                <LabelInput
                                    register={register}
                                    errors={errors}
                                    label={"Description"}
                                    type={"text"}
                                    registerName={"description"}
                                    placeHolder={"Enter your Description"}
                                    errorMessage={"Please Enter Your Description"}
                                />


                                <LabelInput
                                    register={register}
                                    errors={errors}
                                    label={"Provider"}
                                    type={"text"}
                                    registerName={"provider"}
                                    placeHolder={"Enter your Provider Name"}
                                    errorMessage={"Please Enter Your Provider Name"}
                                />


                                <Box w={"100%"}>
                                    <>
                                        <FormControl isInvalid={errors.price !== undefined}>
                                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                                Price
                                            </FormLabel>
                                            <Controller
                                                name={"price"}
                                                border-radius={"0.3rem"}
                                                control={control}
                                                rules={{
                                                    required: "Phone is required",
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <NumberInput     {...field} mb={"8px"}>
                                                            <NumberInputField

                                                                fontSize="sm"
                                                                placeholder="Enter a Price"
                                                            />
                                                            <NumberInputStepper></NumberInputStepper>
                                                        </NumberInput>
                                                    </>
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {errors.price && errors.price.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </>
                                </Box>

                                <LightMode>
                                    <Input
                                        type="submit"
                                        fontSize="14px"
                                        colorScheme="blue"
                                        fontWeight="bold"
                                        cursor={"pointer"}
                                        w="100%"
                                        h="45"
                                        mt={"15px"}
                                        mb="8px"
                                        value={isLoading?"Loading..":"Submit"}
                                        disabled={isLoading}

                                    ></Input>
                                </LightMode>
                            </form>

                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddModal