import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, LightMode, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQuery } from 'react-query';
import { authorizationAxiosInstance } from '../../../../axios/Axios';
import { AdminServiceElemProps } from '../../../../pages/admin/AdminService';
import LabelInput from '../../../shared/LabelInput';

interface EditProps {
    isEditOpen: boolean;
    onEditClose: () => void;
    editUser: SubmitHandler<AdminServiceElemProps>;
    setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: UseFormHandleSubmit<AdminServiceElemProps, undefined>;
    register: UseFormRegister<AdminServiceElemProps>;
    errors: FieldErrors<AdminServiceElemProps>;
    watch: UseFormWatch<AdminServiceElemProps>;
    control: Control<AdminServiceElemProps, any>;
    setValue: UseFormSetValue<AdminServiceElemProps>;
    id: string;
    isEditLoading:boolean;
}

const ServiceEditModal = ({ isEditOpen, onEditClose, editUser, setSelectedUserId, handleSubmit, register, errors, control, setValue, id,isEditLoading }: EditProps) => {

    //Get Single Service Data
    async function getSingleServiceData(id: string) {
        const res = await authorizationAxiosInstance.get(`/admin/service/${id}`)
        return res.data;
    }

    const data = useQuery(["getsingleservicedata", id], () => getSingleServiceData(id), {
        enabled: !!isEditOpen && !!id
    });

    const Data = data?.data?.servicedata

    useEffect(() => {
        if (Data) {
            setValue("service", Data.service);
            setValue("description", Data.description);
            setValue("provider", Data.provider)
            setValue("price", Data.price);
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
                                    value={isEditLoading?"Loading..":"Update"}
                                    disabled={isEditLoading}
                                ></Input>
                            </LightMode>
                        </form>

                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}

export default ServiceEditModal