import { Button, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { UploadFormData } from '../../entities/upload-form-data.interface';
import { upload } from '../../services/api.service';
import './upload.scss'
const Upload: React.FC = () => {
    const [formData, setFormData] = useState<UploadFormData>({ file: null });
    const [message, setMessage] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setFormData({ file });

        if (file && file.type !== 'text/csv') {
            setMessage("Please upload a CSV file.");
            setFormData({ file: null });
        } else {
            setMessage(null);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setMessage(null);

        uploadFile();
    };

    const uploadFile = async () => {
        if (!formData.file) {
            setMessage("Please select a file.");
            return;
        }

        const res = await upload(formData.file);
        if (res) {

            setMessage(res);

        }
    }

    return (
        <div className='upload-container'>
            <h1>Upload File</h1>
            {message && <div className='message'>{message}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".csv"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="file">
                    <Button variant="contained" component="span" fullWidth>
                        Upload CSV
                    </Button>
                </label>
                {formData.file && (
                    <Typography variant="body2" mt={1}>
                        Selected file: {formData.file.name}
                    </Typography>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formData.file}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Upload;