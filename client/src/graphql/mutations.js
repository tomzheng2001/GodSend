import { gql } from '@apollo/client'

export const SIGNUP_USER = gql`
mutation SignupUser($userInfo: UserInput!) {
    signupUser(userInfo: $userInfo) {
      id
      email
      firstName
      lastName
    }
}
`

export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
  signinUser(userSignin: $userSignin) {
    token
  }
}
`
export const SEND_MESSAGE = gql`
  mutation CreateMessage($receiverId: Int!, $text: String!) {
    createMessage(receiverId: $receiverId, text: $text) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`
