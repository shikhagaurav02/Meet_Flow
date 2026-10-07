import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="container py-5 text-center" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '72px', fontWeight: '800', color: '#1976d2', letterSpacing: '-2px' }}>
                404
            </div>
            <h2 className="mt-2 mb-3" style={{ fontWeight: '700' }}>
                Page Not Found
            </h2>
            <p className="text-muted mb-4" style={{ maxWidth: '480px' }}>
                The link you followed may be broken, or the meeting room may have moved. Check the URL or return to home.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button
                    variant="contained"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    sx={{ textTransform: 'none', px: 3, py: 1 }}
                >
                    Back to Home
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<VideocamIcon />}
                    onClick={() => navigate('/home')}
                    sx={{ textTransform: 'none', px: 3, py: 1 }}
                >
                    Join a Meeting
                </Button>
            </div>
        </div>
    );
}

export default NotFound;