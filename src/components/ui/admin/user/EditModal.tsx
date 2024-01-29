import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, LightMode, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, NumberInputStepper, Switch } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQuery } from 'react-query';
import { authorizationAxiosInstance } from '../../../../axios/Axios';
import { AdminUserElemProps } from '../../../../pages/admin/AdminUsers';
import LabelInput from '../../../shared/LabelInput';

interface EditProps {
    isEditOpen: boolean;
    onEditClose: () => void;
    editUser: SubmitHandler<AdminUserElemProps>;
    setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: UseFormHandleSubmit<AdminUserElemProps, undefined>;
    register: UseFormRegister<AdminUserElemProps>;
    errors: FieldErrors<AdminUserElemProps>;
    watch: UseFormWatch<AdminUserElemProps>;
    control: Control<AdminUserElemProps, any>;
    setValue: UseFormSetValue<AdminUserElemProps>;
    id: string;
}

const EditModal = ({ isEditOpen, onEditClose, editUser, setSelectedUserId, handleSubmit, register, errors, control, setValue, id}: EditProps) => {

    //Get Single Data
    async function getSingleUserData(id: string) {
        const res = await authorizationAxiosInstance.get(`/admin/user/${id}`)
        return res.data;
    }

    const data = useQuery(["getsingledata", id], () => getSingleUserData(id), {
        enabled: !!isEditOpen && !!id
    });

    const Data = data?.data?.user

    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    
    const handleSwitchChange = () => {
        setIsAdmin(!isAdmin);
        if (isAdmin) {
            setValue("isAdmin", true);
        } else {
            setValue("isAdmin",false);
        }
    };

    useEffect(() => {
        if (Data) {
            setValue("username", Data.username);
            setValue("email", Data.email);
            setValue("phone", Data.phone)
            setValue("isAdmin", Data.isAdmin);
        }
    }, [Data])


    return (
        <Modal isOpen={isEditOpen} onClose={() => { onEditClose(); setSelectedUserId(""); }}>
            <ModalOverlay />

            <ModalContent width={"80vw"}>
                <Flex p={2} m={5} alignItems={"center"} justifyContent={"center"}>
                    <Flex
                        direction={"column"}
                        alignItems={"center"}
                        width={"100%"}
                        height={"100%"}
                    >
                        <ModalHeader>Edit User</ModalHeader>
                        <ModalCloseButton />

                        <form style={{ width: "100%" }} onSubmit={handleSubmit((data) => editUser(data))}>

                            <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="select-role" mb="0">
                                    Role
                                </FormLabel>
                                <Switch
                                    id="select-role"
                                    onChange={handleSwitchChange}
                                    isChecked={isAdmin}
                                    size="md"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                    {isAdmin ? "User" : "Admin"}
                                </span>
                            </FormControl>
                            <LabelInput
                                register={register}
                                errors={errors}
                                label={"User Name"}
                                type={"text"}
                                registerName={"username"}
                                placeHolder={"Enter your Full Name"}
                                errorMessage={"Please Enter Your Name"}
                            />

                            <LabelInput
                                register={register}
                                errors={errors}
                                label={"Email Address"}
                                type={"email"}
                                registerName={"email"}
                                placeHolder={"Enter your Email Address"}
                                errorMessage={"Please Enter Your Email"}
                            />



                            <Box w={"100%"}>
                                <>
                                    <FormControl isInvalid={errors.phone !== undefined}>
                                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                            Phone Number
                                        </FormLabel>
                                        <Controller
                                            name={"phone"}
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
                                                            placeholder="Enter your Phone number"
                                                        />
                                                        <NumberInputStepper></NumberInputStepper>
                                                    </NumberInput>
                                                </>
                                            )}
                                        />
                                        <FormErrorMessage>
                                            {errors.phone && errors.phone.message}
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
                                    value={"Update"}

                                ></Input>
                            </LightMode>



                        </form>

                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default EditModal