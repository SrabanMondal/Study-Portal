"use client"
import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from "dotenv";
dotenv.config();
const Register = () => {
   const [loading,setLoading] = useState<boolean>()
  const router = useRouter();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     setLoading(true)
    try {
      const formdata = new FormData(e.currentTarget);
      const response = await register(formdata);
      if(response.success) {
        toast.success(response.message);
        setTimeout(() =>{
          router.refresh();
        },2000);
      }
    } catch (error) {
      setLoading(false)
      type CustomError = {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      };
      const err = error as CustomError;
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
        <FormControl>
            <FormLabel color={'white'}>Name</FormLabel>
            <Input name='Name' variant='filled' type='text' isRequired color={'white'} bg={'black'}/>
        </FormControl>
        <FormControl>
            <FormLabel color={'white'}>Email</FormLabel>
            <Input name='email' variant='filled' type='email'  isRequired color={'white'} bg={'black'}/>
        </FormControl>
        <FormControl>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input name='password' variant='filled' type='password' isRequired color={'white'} bg={'black'}/>
        </FormControl>
        <Button isDisabled={loading} type='submit'>Register</Button>
        </VStack>
    </form>
    </>
  )
}
export const register = async (formdata:FormData)=>{
  const username = formdata.get('Name');
  const email = formdata.get('email');
  const password = formdata.get('password');
  const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/user/register',{name:username, email:email, password:password})
  return response?.data;
}
export default Register
