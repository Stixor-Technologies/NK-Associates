'use client'
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import eyeon from '../../public/assets/icons/eyeon.svg';
import eyeoff from '../../public/assets/icons/eyeoff.svg';
const newPassword = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  // const handleSubmit = async (values, actions) => {
  //   setLoading(true);
  //   try {
  //     // Replace this with your actual reset password logic
  //     // const res = await resetPassword(values, code);
  //     // ...

  //     // Replace the following lines with actual logic for your web application
  //     console.log('Password successfully changed');
  //     actions.resetForm();
  //     setTimeout(() => {
  //       history.push('/login'); // Use the correct route for your app
  //     }, 1000);
  //   } catch (error) {
  //     console.error('Something is wrong, please try again later');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit=(password:String,confirmPassword:String,actions)=>{
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    actions.resetForm()
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-nk-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-metropolis-bold mb-4 text-center">New Password</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            password: Yup.string()
              .required('Password is required.')
              .min(8, 'Password must be at least 8 characters.')
              .max(10, 'Password should be at most 10 characters long.')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one numeric value.'
              ),
            confirmPassword: Yup.string()
              .required('Confirm password is required.')
              .oneOf([Yup.ref('password')], 'Passwords do not match.'),
          })}
        >
          {() => (
            <Form>
            <div className="mb-4">
              <label htmlFor="password" className="block text-nk-black font-metropolis text-base mb-1">
                Password*
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-nk-black"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 cursor-pointer">
                  {showPassword ? (
                    <Image src={eyeon} alt="Eye On" width={18} height={18} />
                  ) : (
                    <Image src={eyeoff} alt="Eye Off" width={18} height={18} />
                  )}
                </span>
              </div>
              <ErrorMessage name="password" component="div" className="text-nk-gradient-red-sharp-one font-metropolis" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-nk-black font-metropolis text-base mb-1">
                Confirm Password*
              </label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-nk-black"
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-3 cursor-pointer">
                  {showConfirmPassword ? (
                    <Image src={eyeon} alt="Eye On" width={18} height={18} />
                  ) : (
                    <Image src={eyeoff} alt="Eye Off" width={18} height={18} />
                  )}
                </span>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-nk-gradient-red-sharp-one font-metropolis" />
            </div>

            <div className="mb-4">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nk-white"></div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-nk-gradient-red-two hover:bg-nk-gradient-red-one text-nk-white py-2 rounded-lg focus:outline-none font-metropolis"
                >
                  Reset
                </button>
              )}
            </div>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default newPassword;

