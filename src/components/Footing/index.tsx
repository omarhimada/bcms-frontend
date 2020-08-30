import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { PhoneOutlined, MailOutlined, RoomOutlined } from "@material-ui/icons";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Configuration } from "../Root/types";

const useStyles = makeStyles((theme: Theme) => ({
  footerRoot: {
    flexGrow: 1,
    maxWidth: "1376px",
    width: "100%",
    justifyContent: "center",
    margin: "0 auto",
    //backgroundColor: theme.palette.background.paper,
  },
	listWrap: {},
	addressLine: {
		margin: 0
	},
  inline: {
    display: "inline",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

/* Use the retrieved configuration to render the footer,
 * including social links and contact details */
export default (params: any) => {
  const configuration: Configuration = params.configuration;
  const classes = useStyles();

  return (
    <div className={classes.footerRoot}>
      <Grid justify={"space-between"} container>
        <Grid xs={12} sm={12} md={6} lg={3} item>
          <Typography variant="h6" className={classes.title}>
            Contact
          </Typography>
          <div className={classes.listWrap}>
            <List dense={true}>
              <ListItem
                button
                href={`tel:${configuration.contactPhoneNumber}`}
                component="a"
              >
                <ListItemIcon>
                  <PhoneOutlined />
                </ListItemIcon>
                <ListItemText primary={configuration.contactPhoneNumber} />
              </ListItem>
              <ListItem
                button
                href={`mailto:${configuration.contactEmail}`}
                target="_blank"
                component="a"
              >
                <ListItemIcon>
                  <MailOutlined />
                </ListItemIcon>
                <ListItemText primary={configuration.contactEmail} />
              </ListItem>
            </List>
          </div>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} item>
          <Typography variant="h6" className={classes.title}>
            Address
          </Typography>
          <div className={`${classes.listWrap} physical-address-wrap`}>
            <List dense={true}>
              <ListItem
                button
                href={`http://maps.google.com/maps/search/${configuration.shortName}/@${configuration.geoLocation.latitude},${configuration.geoLocation.longitude},15z/`}
                target="_blank"
                component="a"
              >
                <ListItemIcon>
                  <RoomOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {configuration.physicalAddress !== null
                          ? configuration.physicalAddress
                              .split("\n")!
                              .map((line, i) => (
                                <p className={classes.addressLine} key={`address-${i}`}>{line}</p>
                              ))
                          : ""}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          </div>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} item>
          <Typography variant="h6" className={classes.title}>
            Facebook
          </Typography>
          <div className={classes.listWrap}>
            <List dense={true}>
              <ListItem
                button
                href={configuration.facebookLink}
                target="_blank"
                component="a"
              >
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <ListItemText primary={configuration.shortName} />
              </ListItem>
            </List>
          </div>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} item>
          <Typography variant="h6" className={classes.title}>
            Instagram
          </Typography>
          <div className={classes.listWrap}>
            <List dense={true}>
              <ListItem
                button
                href={configuration.instagramLink}
                target="_blank"
                component="a"
              >
                <ListItemIcon>
                  <InstagramIcon />
                </ListItemIcon>
                <ListItemText primary={configuration.shortName} />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
