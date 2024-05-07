import { gql } from "@apollo/client";

export const QUERY_PLAYER = gql`
  query Player($playerName: String!) {
    Player(playerName: $playerName) {
      _id
      playerName: String
      sport: String
      category: String
      line: String
      typeOfLine: String
      position: String
      team: String
      opponent: String
      usagePercent: String
      minutes: Int
      minutesPercentage: String
      projection: Int
      dvaPositionDefense: String
    }
  }
`;

export const CHECK_USERNAME = gql`
  query user($username: String!) {
    user(username: $username) {
      username
    }
  }
`;
