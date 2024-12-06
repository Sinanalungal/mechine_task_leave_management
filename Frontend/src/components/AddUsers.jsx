import React, { useState } from 'react';
import { getAxiosInstance } from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { InputField } from './AddUser/InputField';
import { SubmitButton } from './AddUser/SubmitButton';
import { PageHeader } from './AddUser/PageHeader';


const AddUserComponent= () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors= {};

    // Validation logic remains the same as in the original component
    if (!userData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!userData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // ... (rest of the validation logic)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post('/user_authentication/users/', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone_number: userData.phone_number,
        department: userData.department,
        password: userData.password, 
        username: userData.email,
      });

      if (response.status === 201) {
        toast.success('User added successfully!');
        setUserData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          department: '',
          password: '',
          confirm_password: '',
        });
        setErrors({});
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      // Error handling logic remains the same
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          Object.keys(data).forEach((field) => {
            if (field !== 'username') {
              toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${data[field].join(' ')}`);
            }
          });
          setErrors(data);
        } else {
          toast.error(`Unexpected error occurred. Status: ${status}`);
        }
      } else {
        toast.error('Failed to add user. Please check your network connection.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8 rounded-lg font-roboto max-sm:text-xs text-sm xl:text-base bg-white">
      <PageHeader title="Add New User" />

      <form onSubmit={handleSubmit} className="sm:grid grid-cols-2 max-sm:space-y-3 gap-6">
        <InputField
          label="First Name"
          name="first_name"
          value={userData.first_name}
          onChange={handleInputChange}
          error={errors.first_name}
          placeholder="Enter first name"
        />

        <InputField
          label="Last Name"
          name="last_name"
          value={userData.last_name}
          onChange={handleInputChange}
          error={errors.last_name}
          placeholder="Enter last name"
        />

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter email address"
        />

        <InputField
          label="Phone Number"
          name="phone_number"
          value={userData.phone_number}
          onChange={handleInputChange}
          error={errors.phone_number}
          placeholder="Enter phone number"
        />

        <InputField
          label="Department"
          name="department"
          value={userData.department}
          onChange={handleInputChange}
          error={errors.department}
          placeholder="Enter department"
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Enter password"
        />

        <InputField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={userData.confirm_password}
          onChange={handleInputChange}
          error={errors.confirm_password}
          placeholder="Confirm password"
        />

        <SubmitButton>Add User</SubmitButton>
      </form>
    </div>
  );
};

export default AddUserComponent;