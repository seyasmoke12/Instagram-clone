import {Avatar,Button,Center,Flex,FormControl,FormLabel,Heading,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,Stack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";
import usePreviewimg from "../../hooks/usePreviewimg";
import useAuthStore from "../../store/authStore";

const EditProfile = ({ isOpen, onClose }) => {
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewimg();
	const { isUpdating, editProfile } = useEditProfile();
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});


	useEffect(() => {
		if (authUser) {
			setInputs({
				fullName: authUser.fullName || "",
				username: authUser.username || "",
				bio: authUser.bio || "",
			});
		}
	}, [authUser]);

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			console.error("Error updating profile:", error.message);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
				<ModalHeader>Edit Profile</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex bg={"black"}>
						<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
							<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
								Edit Profile
							</Heading>
							<FormControl>
								<Stack direction={["column", "row"]} spacing={6}>
									<Center>
										<Avatar
											size="xl"
											src={selectedFile || authUser?.profilePicURL}
											border={"2px solid white "}
										/>
									</Center>
									<Center w="full">
										<Button w="full" onClick={() => fileRef.current.click()}>
											Edit Profile Picture
										</Button>
									</Center>
									<Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
								</Stack>
							</FormControl>

							<FormControl>
								<FormLabel fontSize={"sm"}>Full Name</FormLabel>
								<Input
									placeholder={"Full Name"}
									size={"sm"}
									type={"text"}
									value={inputs.fullName}
									onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
								/>
							</FormControl>

							<FormControl>
								<FormLabel fontSize={"sm"}>Username</FormLabel>
								<Input
									placeholder={"Username"}
									size={"sm"}
									type={"text"}
									value={inputs.username}
									onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								/>
							</FormControl>

							<FormControl>
								<FormLabel fontSize={"sm"}>Bio</FormLabel>
								<Input
									placeholder={"Bio"}
									size={"sm"}
									type={"text"}
									value={inputs.bio}
									onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
								/>
							</FormControl>
                            
							<Stack spacing={6} direction={["column", "row"]}>
								<Button
									bg={"red.400"}
									color={"white"}
									w="full"
									size="sm"
									_hover={{ bg: "red.500" }}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									bg={"blue.400"}
									color={"white"}
									size="sm"
									w="full"
									_hover={{ bg: "blue.500" }}
									onClick={handleEditProfile}
									isLoading={isUpdating}
								>
									Submit
								</Button>
							</Stack>
						</Stack>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EditProfile;


















// import React from 'react'
// import {Button,Flex,FormControl,FormLabel,Heading,Input,Stack,useColorModeValue,HStack,Avatar,AvatarBadge,IconButton,Center,} from '@chakra-ui/react'
// import { SmallCloseIcon } from '@chakra-ui/icons'

// function EditProfile({isOpen,onClose}) {
//     return (
//     <Flex
//     isOpen={isOpen}
//     onClose={onClose}
//       minH={'100vh'}
//       align={'center'}
//       justify={'center'}
//       bg={useColorModeValue('gray.50', 'gray.800')}>
//       <Stack
//         spacing={4}
//         w={'full'}
//         maxW={'md'}
//         bg={useColorModeValue('white', 'gray.700')}
//         rounded={'xl'}
//         boxShadow={'lg'}
//         p={6}
//         my={12}>
//         <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
//           User Profile Edit
//         </Heading>
//         <FormControl id="userName">
//           <FormLabel>User Icon</FormLabel>
//           <Stack direction={['column', 'row']} spacing={6}>
//             <Center>
//               <Avatar size="xl" src="https://bit.ly/sage-adebayo">
//                 <AvatarBadge
//                   as={IconButton}
//                   size="sm"
//                   rounded="full"
//                   top="-10px"
//                   colorScheme="red"
//                   aria-label="remove Image"
//                   icon={<SmallCloseIcon />}
//                 />
//               </Avatar>
//             </Center>
//             <Center w="full">
//               <Button w="full">Change Icon</Button>
//             </Center>
//           </Stack>
//         </FormControl>
//         <FormControl id="userName" isRequired>
//           <FormLabel>User name</FormLabel>
//           <Input
//             placeholder="UserName"
//             _placeholder={{ color: 'gray.500' }}
//             type="text"
//           />
//         </FormControl>
//         <FormControl id="email" isRequired>
//           <FormLabel>Email address</FormLabel>
//           <Input
//             placeholder="your-email@example.com"
//             _placeholder={{ color: 'gray.500' }}
//             type="email"
//           />
//         </FormControl>
//         <FormControl id="password" isRequired>
//           <FormLabel>Password</FormLabel>
//           <Input
//             placeholder="password"
//             _placeholder={{ color: 'gray.500' }}
//             type="password"
//           />
//         </FormControl>
//         <Stack spacing={6} direction={['column', 'row']}>
//           <Button
//             bg={'red.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'red.500',
//             }}>
//             Cancel
//           </Button>
//           <Button
//             bg={'blue.400'}
//             color={'white'}
//             w="full"
//             _hover={{
//               bg: 'blue.500',
//             }}>
//             Submit
//           </Button>
//         </Stack>
//       </Stack>
//     </Flex>
//   )
// }

// export default EditProfile