import React, { useState } from "react"
import config from "../../config"
import { Redirect } from "react-router-dom"
import FormError from "../layout/FormError"

const SignInForm = ({ user }) => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  if (user) {
    return <Redirect push to= "/saved" />
  }

  const validateInput = (payload) => {
    setErrors({})
    const { email, password } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    return newErrors
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let newErrors = validateInput(userPayload)
    try {
      if (Object.keys(newErrors).length === 0) {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        if (!response.ok) {
          if (response.status === 401) {
            newErrors = {...newErrors, password: "sign in failed - invalid credentials"}
            setErrors(newErrors)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        setShouldRedirect(true)
      }
      setErrors(newErrors)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <div className="grid-container page-height center-items vertically-center" onSubmit={onSubmit}>
      <div className="callout form-container">
        <h1 className="text-center">Sign In</h1>
        <form>
          <div>
            <label>
              Email:
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div className="center-items">
            <input type="submit" className="button" value="Sign In" />
          </div>
        </form>
        <a href="/users/new" className="center-items">Dont have an account? Sign Up</a>
      </div>
    </div>
  )
}

export default SignInForm