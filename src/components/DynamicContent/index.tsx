import * as React from "react";
import Gallery from "./Gallery";
import Services from "./Services";
import FAQs from "./FAQs";
import TeamMembers from "./TeamMembers";
import Grid from "@material-ui/core/Grid";

export default (params) => {
  if (params.type === null || params.type === "None") return <></>;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="dynamic-content-wrap">
        {
          {
            FAQs: <FAQs />,
            Gallery: <Gallery />,
            // InstagramFeed: (
            //   <InstagramFeed
            //     instagramLink={params.configuration.instagramLink}
            //   />
            // ),
            Services: <Services />,
            TeamMembers: <TeamMembers />,
          }[params.type]
        }
      </Grid>
    </Grid>
  );
};
