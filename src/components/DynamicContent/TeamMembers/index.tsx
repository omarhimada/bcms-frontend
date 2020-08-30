import * as React from "react";
import { useQuery } from "@apollo/client";
import ReactHtmlParser from "react-html-parser";
import { GET_TEAM_MEMBERS } from "./queries";
import { TeamMember } from "./types";
import Loading from "../../Loading";
import {
  Divider,
  Card,
  Grid,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";

export default () => {
  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS);

  if (loading) return <Loading />;
  if (error) {
    return (
      <span>
        Error!
        {error.message}
      </span>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {_renderTeamMembers(data.teamMembers)}
      </Grid>
    </>
  );
};

/* Render a Col containing a Card for each team member */
export function _renderTeamMembers(teamMembers: TeamMember[]) {
  return teamMembers.map((teamMember) => (
    <Grid item key={`col-team-member-${teamMember.name}`} xs={6} lg={4}>
      <Card
        key={teamMember.name}
        style={{
          margin: "0 auto 1rem auto",
          maxWidth: `${teamMember.profileImage.width}px`,
          height: "100%",
        }}
        title={teamMember.name}
      >
        <CardHeader title={teamMember.name} />
        <CardMedia
          image={teamMember.profileImage.url}
          title={teamMember.name}
          style={{
            height: `${teamMember.profileImage.height}px`,
          }}
        />
        <CardContent>
          {ReactHtmlParser(teamMember.blurb.html)}
        </CardContent>
      </Card>
    </Grid>
  ));
}
