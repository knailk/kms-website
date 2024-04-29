import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
    },
    '&:focus': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
    margin: '10px 0px',
    transition: 'background-color 0.1s',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingRight: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
    },
    fontSize: 15,
}));

function SearchBox({ placeholder, style, inputRef, value, onChange }) {
    return (
        <Search style={style}>
            <SearchIconWrapper>
                <SearchIcon style={{ color: '#0000005e' }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                inputRef={inputRef}
                value={value}
                onChange={onChange}
            />
        </Search>
    );
}

export default SearchBox;
