//react imports
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

//custom imports
import FormField from '../components/FormField'
import { setToken } from '../utils/token'

function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })
  const [submitting, setSubmitting] = useState(false)

  const handleFormSubmit = async (data) => {
    setSubmitting(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data)
      if (response.status === 200) {
        toast.success(response.data.message || 'Login successful!')
        setToken(response.data.data?.token)
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
        setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-5xl font-bold text-blue-600 text-center mb-3">Welcome Back!</h1>
        <p className="mt-2 text-gray-500 text-md text-center">
          Sign in to continue to ResumeInsight.
        </p>

        <form className="mt-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
             <FormField
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address'}
                  }
                )}
             />
          </div>
          <div className="mb-4">
             <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password', { 
                    required: 'Password is required',
                    maxLength: { value: 20, message: 'Password cannot exceed 20 characters' },
                    minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                  }
                )}
             />
          </div>
          <button type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            disabled={submitting}>
              {submitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login