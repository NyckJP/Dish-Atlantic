import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import FormError from "../layout/FormError"
import config from "../../config"

const RegistrationForm = ({ user }) => {
  const [userPayload, setUserPayload] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  if(user) {
    return <Redirect push to= "/saved" />
  }

  const validateInput = (payload) => {
    setErrors({})
    const { userName, email, password, passwordConfirmation } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (userName.trim() == "") {
      newErrors = {
        ...newErrors, 
        userName: "is invalid"
      }
    } else {
      if (userName.length > 8) {
        newErrors = {
          ...newErrors,
          userName: "8 characters max"
        }
      }
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
      }
    }

    return newErrors
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let newErrors = validateInput(userPayload)
    try {
      if (Object.keys(newErrors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          if(response.status === 422) {
            newErrors = {...newErrors, email: "email already in use"}
            setErrors(newErrors)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        setShouldRedirect(true)
      }
      setErrors(newErrors)
    } catch (err) {
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
    <div className="grid-container page-height center-items vertically-center">
      <div className="callout form-container">
        <h1 className="text-center">Register An Account</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>
              Username:
              <input type="text" name="userName" placeholder="8 characters max" value={userPayload.userName} onChange={onInputChange} />
              <FormError error={errors.userName} />
            </label>
            <label>
              Email:
              <input type="text" name="email" placeholder="fake email is acceptable" value={userPayload.email} onChange={onInputChange} />
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
          <div>
            <label>
              Password Confirmation:
              <input
                type="password"
                name="passwordConfirmation"
                value={userPayload.passwordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.passwordConfirmation} />
            </label>
          </div>
          <div className="center-items">
            <input type="submit" className="button" value="Register" />
          </div>
        </form>
        <a href="/user-sessions/new" className="center-items">Already have an account? Sign In</a>
      </div>
    </div>
  )
}

export default RegistrationForm
