import { useContext, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { ShoppingCartContext } from '../../Context/index.jsx'
import Layout from '../../Components/Layout/index.jsx'

function SignIn () {
  const context = useContext(ShoppingCartContext)
  const form = useRef(null)
  const [view, setView] = useState('user-info')

  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  const noAccountInLocalStorage = parsedAccount ? Object.keys(
    parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(
    context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)

    return <Navigate to={'/'}/>
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const stringifiedData = JSON.stringify(data)
    localStorage.setItem('account', stringifiedData)
    context.setAccount(data)

    handleSignIn()
  }

  const renderLogIn = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to="">
          <button
            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
            disabled={!hasUserAnAccount}
            onClick={() => handleSignIn()}>
            Log in
          </button>
        </Link>
        <div className="text-center">
          <a href="/"
             className="font-light text-xs underline underline-offset-4">
            Forgot my password
          </a>
        </div>
        <button
          className="border border-black disabled:text-black/40
          disabled:border-black/40 rounded-lg mt-6 py-3"
          disabled={hasUserAnAccount}
          onClick={() => setView('create-user-info')}>
          Sign up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">Your
            name:</label>
          <input
            className="border border-black rounded-lg placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            defaultValue={parsedAccount?.name}
            id="name"
            name="name"
            placeholder="Peter"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">Your
            email:</label>
          <input
            className="border border-black rounded-lg placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            defaultValue={parsedAccount?.email}
            id="email"
            name="email"
            placeholder="hi@helloworld.com"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">Your
            Passowrd:</label>
          <input
            className="border border-black rounded-lg placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
            defaultValue={parsedAccount?.password}
            id="password"
            name="password"
            placeholder="*******"
            type="password"
          />
        </div>
        <Link to="/">
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            onClick={() => createAnAccount()}>
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info'
    ? renderCreateUserInfo()
    : renderLogIn()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn
