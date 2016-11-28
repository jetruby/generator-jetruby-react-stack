import gql from 'graphql-tag'

export const createUser = gql`
  mutation(
    $email: String!,
    $password: String!,
    $passwordConfirmation: String!,
    $mobile: String!,
    $personalWebsite: String,
    $secondEmail: String,
    $thirdEmail: String,
    $fourthEmail: String,
    $companyName: String!,
    $officeBranch: String!,
    $city: String!,
    $state: String!,
    $zipCode: Int!,
    $companyWebsite: String!
  ) {
    createUser (
      name: $name,
      email: $email,
      password: $password,
      passwordConfirmation: $passwordConfirmation,
      mobile: $mobile,
      personalWebsite: $personalWebsite,
      secondEmail: $secondEmail,
      thirdEmail: $thirdEmail,
      fourthEmail: $fourthEmail,
      companyName: $companyName,
      officeBranch: $officeBranch,
      city: $city,
      state: $state,
      zipCode: $zipCode,
      companyWebsite: $companyWebsite
    ) {
      id
      name
    }
  }
`
