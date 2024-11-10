import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();

    const styles = {
        width: '100%',
        height: '100%',
        backgroundImage: "url('/images/logo.png')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        cursor: 'pointer',
    };

    return <div style={styles} onClick={() => navigate('/')} role="button" tabIndex={0}></div>;
}

export default Logo;
