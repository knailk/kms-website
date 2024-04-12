//generate color for each character
import * as color from '@mui/material/colors';


export const generateColor = (str) => {
    switch (str) {
        case "A":
            return color.red[500];
        case "B":
            return color.pink[500];
        case "C":
            return color.purple[500];
        case "D":
            return color.deepPurple[500];
        case "E":
            return color.indigo[500];
        case "F":
            return color.blue[500];
        case "G":
            return color.lightBlue[500];
        case "H":
            return color.cyan[500];
        case "I":
            return color.teal[500];
        case "J":
            return color.green[500];
        case "K":
            return color.lightGreen[500];
        case "L":
            return color.lime[500];
        case "M":
            return color.yellow[500];
        case "N":
            return color.amber[500];
        case "O":
            return color.orange[500];
        case "P":
            return color.deepOrange[500];
        case "Q":
            return color.brown[500];
        case "R":
            return color.grey[500];
        case "S":
            return color.blueGrey[500];
        case "T":
            return color.red[500];
        case "U":
            return color.pink[500];
        case "V":
            return color.purple[500];
        case "W":
            return color.deepPurple[500];
        case "X":
            return color.indigo[500];
        case "Y":
            return color.blue[500];
        case "Z":
            return color.lightBlue[500];
        default:
            return color.grey[500];
    }
};