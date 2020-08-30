import * as React from "react";
import GraphImg from "graphcms-image";
import { useQuery } from "@apollo/client";
import Loading from "../../Loading";
import { GET_GALLERIES } from "./queries";
import {
  Divider,
  Card,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardContent,
  CardHeader,
  ButtonBase,
  Dialog,
  Fade,
} from "@material-ui/core";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Image } from './types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  }),
);

export default () => {
  const [selectedImage, setSelectedImage] = React.useState<Image | null>(null);
  const { loading, error, data } = useQuery(GET_GALLERIES);
  const classes = useStyles();

  const handleClickOpen = image => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <span>
        Error!
        {error.message}
      </span>
    );
  }

  const { galleries } = data;

  return (
    <>
      <Divider />
        {galleries.map((gallery) => (
          <>
            <Typography
              variant="h2"
              gutterBottom
            >
              {gallery.title}
            </Typography>
            <Divider />
            <Grid container
              key={`row-${gallery.title}`}
              spacing={2}
              justify="space-around"
            >
              {gallery.images.map((image) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={`col-${image.handle}`}>
                  <ButtonBase
                    focusRipple
                    key={image.handle}
                    onClick={() => handleClickOpen(image)}
                  >
                    {/* Render a clickable thumbnail image */}
                    <GraphImg
                      key={image.handle}
                      // title="Sample"
                      // alt="Sample"
                      image={{
                        handle: image.handle,
                        width: 664,
                        height: 664,
                      }}
                      fit="scale"
                      withWebp
                      style={{
                        width: 332,
                        height: 332,
                      }}
                    />
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </>
        ))}
        <Dialog
          fullScreen
          open={selectedImage !== null}
          onClose={handleClose}
        >
          {selectedImage && (
            <div
              key={`image-modal-wrap-${selectedImage.handle}`}
              className="image-modal-wrap"
            >
              <GraphImg
                key={`large-${selectedImage.handle}`}
                image={{
                  handle: selectedImage.handle,
                  width: selectedImage.width,
                  height: selectedImage.height,
                }}
                fit="max"
                maxWidth={1376}
                withWebp
                style={{
                  width: selectedImage.width,
                  height: selectedImage.height,
                  maxHeight: window.innerHeight - 40,
                }}
              />
            </div>
          )}
        </Dialog>
      <Divider />
    </>
  );
};