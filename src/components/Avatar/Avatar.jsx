import { Avatar as AvatarMui } from '@mui/material';

function Avatar({ src, name, width = 50, height = 50, className }) {
    return (
        <>
            {src && <AvatarMui sx={{ width: 50, height: 50 }} src={src} alt={name} />}
            {!src && (
                <AvatarMui sx={{ width: width, height: height, backgroundColor: '#0072cd' }}>
                    {name ? name.charAt(0) : ''}
                </AvatarMui>
            )}
        </>
    );
}

export default Avatar;
