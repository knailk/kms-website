import { Avatar as AvatarMui } from '@mui/material';

function Avatar({ src, name, width = 50, height = 50, style }) {
    return (
        <>
            {src && <AvatarMui sx={{ width: width, height: height, ...style }} src={src} alt={name} />}
            {!src && (
                <AvatarMui sx={{ width: width, height: height, backgroundColor: '#0072cd', ...style }}>
                    {name ? name.charAt(0) : ''}
                </AvatarMui>
            )}
        </>
    );
}

export default Avatar;
