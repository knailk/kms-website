
function Logo() {
    const styles = {
        width: '100%',
        height: '100%',
        backgroundImage: "url('/images/logo.jpg')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return <div style={styles}></div>;
}

export default Logo;
