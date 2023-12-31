import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
function ManagerLogin({handleLogin}) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate()
  

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'All fields must be filled.',
      });
      return;
    }
  
    fetch('http://127.0.0.1:5555/manager_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Incorrect email or password. Please try again.');
        } else if (response.status === 404) {
          throw new Error('User not found.');
        }else if(response.status === 403) {
          throw new Error('Insufficient privileges to access this resource');
        }
         else {
          throw new Error('An error occurred. Please try again later.');
        }
      })
      .then((userData) => {
        if (userData && (userData.role === 'Admin' || userData.role === 'Procurement')){
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
          });
          if (userData.role === 'Admin' || userData.role === "admin") {
            navigate('/admin/dashboard');
          } else if (userData.role === 'Procurement') {
            navigate('/procurement/dashboard');
          }
          setEmail('');
          setPassword('');
          login(userData);
        } else {
          
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: error.message,
        });
        setEmail('');
        setPassword('');
      });
  }
  
  return (
    <div>
      <section className="h-screen bg-opacity-81">
  <div className="h-full mb-2 p-10">
    <div
      className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-around">
      <div
        className="shrink-1 mb-15 grow-0 basis-auto md:mb-0 md:w-8/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
        <img
          src="https://img.freepik.com/free-vector/data-protection-technology-template-vector-with-lock-icon_53876-126049.jpg?w=1380&t=st=1701635195~exp=1701635795~hmac=41e1e607fa72f93e6c5445ea2d8591e263cf3d36b4baab71f5986e5573ed88b4"
          className="w-full"
          alt="Sample" />
      </div>

      <div className="mb-11 md:mb-0 md:w-8/12 md:shrink-0 lg:w-5/12 xl:w-5/12">
        <form>
          <div
            className="flex flex-row items-center justify-center lg:justify-start">
            <p className="mb-0 mr-4 text-lg">Sign in with your:</p>

          </div>

          <div
            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              className="mx-4 mb-0 text-center font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
          <label
              htmlFor="exampleFormControlInput2"
              
              >Email address
            </label>
            <input
              type="text"
              name="email"
              style={{border: "1px solid #ccc"}}
              value={email}
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-50 focus:placeholder:translate-y-[-100%] data-[te-input-state-active]:placeholder:opacity-50 data-[te-input-state-active]:placeholder:translate-y-[-100%] motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address" />

              
            
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
          <label
                htmlFor="exampleFormControlInput22"
                
                >Password
            </label>
          
            <input
              type="password"
              name="password"
              style={{border: "1px solid #ccc"}}
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput22"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" />
             
     
            
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="mb-[0.125rem] block min-h-[1.4rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck2" />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="exampleCheck2">
                Remember me
              </label>
            </div>

            <a href="/forgot">Forgot password?</a>
          </div>

          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="blue"
              onClick={handleSubmit}>
              Login
            </button>

            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Don't have an account?
              <a
                href="/register"
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >Register</a
              >
            </p>
            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
              Login as Employee{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default ManagerLogin
