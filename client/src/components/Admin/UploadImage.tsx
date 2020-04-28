import * as React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import axios from '../../axios';
import Grid from '@material-ui/core/Grid';
import BackupIcon from '@material-ui/icons/Backup';


export default function ImageUpload(props) {
    const [file, setFile] = React.useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState<any | String>('');

    const handleSubmit = e => {
        e.preventDefault();
        let formdata = new FormData()
        formdata.append(`file`, file)
        axios.post(`Image/default.png`, formdata).then(
            (res: any) => props.setImageFile(res.data.filename)).catch(error => console.log(error));
    }

    const handleImageChange = e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div>
            <FormControl onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item><input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />
                        <label htmlFor="contained-button-file">
                            {!imagePreviewUrl ? <BackupIcon style={{ width: "400", height: "250", color: "lightgrey" }} /> : <img src={imagePreviewUrl} width="400" height="250" alt="Didn't Load" />}
                        </label></Grid>
                    <Grid item container justify="center"><Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Upload Image</Button></Grid>

                </Grid>
            </FormControl>

        </div>
    )
}
