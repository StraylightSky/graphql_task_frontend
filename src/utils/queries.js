import gql from 'graphql-tag';

export const CARS_QUERY = gql`
  {
    cars {
      id
      title
      vin
      make
      model
      year
    }
  }
`;

export const CAR_QUERY = gql`
  query Car($id: ID!) {
    car(id: $id) {
      id
      title
      vin
      make
      model
      year
    }
  }
`;

export const CREATE_CAR_MUTATION = gql`
  mutation CreateCarMutation(
    $title: String!,
    $vin: String,
    $make: String,
    $model: String,
    $year: Int,
  ) {
    createCar(
      title: $title,
      vin: $vin,
      make: $make,
      model: $model,
      year: $year,
    ) {
      id
      title
      vin
      make
      model
      year
    }
  }
`;

export const UPDATE_CAR_MUTATION = gql`
  mutation UpdateCarMutation(
    $title: String!,
    $vin: String,
    $make: String,
    $model: String,
    $year: Int,
  ) {
    updateCar(
      title: $title,
      vin: $vin,
      make: $make,
      model: $model,
      year: $year,
    ) {
      id
      title
      vin
      make
      model
      year
    }
  }
`;

export const DELETE_CAR_MUTATION = gql`
  mutation DeleteCarMutation($id: ID!) {
    deleteCar(id: $id) {
      id
      vin
      make
      model
      year
    }
  }
`;

export const NEW_CARS_SUBSCRIPTION = gql`
  subscription {
    newCar {
      id
      title
      vin
      make
      model
      year
    }
  }
`;
