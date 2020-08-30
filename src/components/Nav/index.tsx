import * as React from 'react';
import Page from '../Page';
import { ContentPage } from '../Page/types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Toolbar from "@material-ui/core/Toolbar";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={0}>
					<Grid item xs={12}>
						{children}
					</Grid>
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  navRoot: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
	},
	pageWrapper: {
		maxWidth: '1376px',
		width: '100%',
		justifyContent: 'center',
		margin: '0 auto',
	},
	tab: {
		padding: 0
	}
}));

export default function Nav(params) {
	const { configuration } = params;
	const { pages } = params;

	const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

	return (
		<div className={classes.navRoot}>
			<AppBar position="static">
					<Toolbar>
						<Grid justify={"space-between"} container>
							<Grid xs={12} sm={5} md={5} item>
								{/* Render the logo using the logo HTML */}
								{_renderLogo(configuration.logoHtml)}
							</Grid>
							<Grid xs={12} sm={7} md={7} item>
								<Grid container justify={"center"}>
								<Tabs 
										value={value} 
										onChange={handleChange} 
										indicatorColor="primary"
										variant="fullWidth"
										aria-label="Navigation">
										{/* Render a tab for each page */}
										{pages.map((page: ContentPage) => (
											<Tab 
												className={classes.tab}
												key={page.id}
												label={page.title} 
												{...a11yProps(0)} />
										))}
									</Tabs>
								</Grid>
							</Grid>
						</Grid>
					</Toolbar>
			</AppBar>
			{/* Render a tab panel for each page */}
			{pages.map((page: ContentPage, index: number) => (
				<TabPanel
					value={value} 
					index={index} 
					key={page.id}
					{...a11yProps(0)}>
						<div className={classes.pageWrapper}>
							{/* Page component renders the header and content of the layout */}
							<Page pageId={page.id} />
						</div>
				</TabPanel>
			))}
		</div>
	);
};

/* Get the site's configuration for the logo HTML and parse it */
export function _renderLogo(logoHtml: string) {
	// If the logo HTML is an <svg> use dangerouslySetInnerHtml to avoid React parsing issues
	return (
		<div
			className="tabs-logo-wrap"
			dangerouslySetInnerHTML={{ __html: logoHtml }}
			onClick={() => {
				// If the user clicks the logo navigate to the first tab (assume 'Home')
				const homeTab = document.querySelector<HTMLButtonElement>('button[data-baseweb=tab]:first-child');
				homeTab!.click();
				homeTab!.focus();
			}}
		/>
	);
}