import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const useStyles = makeStyles((theme: Theme) => ({
  footerRoot: {
		flexGrow: 1,
		maxWidth: '1376px',
		width: '100%',
		justifyContent: 'center',
		margin: '0 auto',
    //backgroundColor: theme.palette.background.paper,
	},
	listWrap: {

	},
	title: {
		margin: theme.spacing(4, 0, 2),
	},
}));

/* Use the retrieved configuration to render the footer,
 * including social links and contact details */
export default (params: any) => {
	const { configuration } = params;
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
								component="a">
								<ListItemIcon>
									<PhoneOutlined />
								</ListItemIcon>
								<ListItemText
									primary={configuration.contactPhoneNumber}
								/>
							</ListItem>
							<ListItem
								button 
								href={`mailto:${configuration.contactEmail}`}
								target="_blank"
								component="a">
								<ListItemIcon>
									<MailOutlined />
								</ListItemIcon>
								<ListItemText
									primary={configuration.contactEmail}
								/>
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
							<ListItem>
								<ListItemIcon>
									<PhoneOutlined />
								</ListItemIcon>
								<ListItemText
									primary={
										<>
										</>
									}
								/>
							</ListItem>
							<ListItem
								button 
								href={`mailto:${configuration.contactEmail}`}
								target="_blank"
								component="a">
								<ListItemIcon>
									<MailOutlined />
								</ListItemIcon>
								<ListItemText
									primary={configuration.contactEmail}
								/>
							</ListItem>
            </List>
          </div>



					<Descriptions title="Address" size="small" key="descriptions-1">
						<Descriptions.Item key="descriptions-1-0" className="physical-address-wrap">
							
						</Descriptions.Item>
					</Descriptions>
				</Grid>
				
				<Grid xs={12} sm={12} md={6} lg={3} item>
					<Descriptions title="Facebook" size="small" key="descriptions-2">
						<Descriptions.Item key="descriptions-2-0">
							<StyledLink
								href={configuration.facebookLink}
							>
								<FacebookOutlined
									style={{
										fontSize: '2rem',
										color: 'rgba(255,255,255,0.85',
									}}
								/>
							</StyledLink>
						</Descriptions.Item>
					</Descriptions>
				</Grid>
				
				<Grid xs={12} sm={12} md={6} lg={3} item>
					<Descriptions title="Instagram" size="small" key="descriptions-3">
						<Descriptions.Item key="descriptions-3-0">
							<StyledLink
								href={configuration.instagramLink}
							>
								<InstagramOutlined
									style={{
										fontSize: '2rem',
										color: 'rgba(255,255,255,0.85',
									}}
								/>
							</StyledLink>
						</Descriptions.Item>
					</Descriptions>
				</Grid>
			</Grid>
		</div>
	);
};
