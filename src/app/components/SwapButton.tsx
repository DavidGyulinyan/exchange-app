import IconButton from '@mui/material/IconButton';
import { SvgIcon } from "@mui/material";

interface swapButtonProp {
    onClick: () => void;
};

export default function SwapButton({ onClick }: swapButtonProp) {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                width: "50px",
                height: "50px"
            }}>
            <SvgIcon>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="none">
                        <path d="M3636 4630 c-83 -25 -129 -129 -95 -217 5 -15 132 -151 282 -300
l271 -273 -1761 -2 -1762 -3 -32 -30 c-36 -34 -59 -82 -59 -122 0 -42 36 -106
77 -133 l37 -25 1745 -3 1745 -2 -266 -268 c-147 -147 -271 -280 -277 -295
-49 -129 63 -256 192 -217 36 10 105 75 459 428 230 229 425 431 433 448 20
43 19 97 -4 142 -11 20 -205 222 -433 448 -349 348 -419 414 -453 423 -46 13
-59 13 -99 1z"/>
                        <path d="M1392 2380 c-27 -6 -127 -100 -455 -426 -232 -231 -430 -432 -439
-449 -20 -33 -23 -90 -7 -132 14 -38 823 -849 873 -875 100 -51 226 26 226
139 0 24 -6 56 -14 71 -8 15 -134 146 -280 292 -146 146 -266 268 -266 272 0
5 787 8 1749 8 l1748 0 33 23 c47 31 71 67 77 115 7 55 -26 123 -75 154 l-37
23 -1745 3 -1744 2 266 268 c147 147 272 280 277 295 47 125 -59 248 -187 217z"/>
                    </g>
                </svg>
            </SvgIcon>
        </IconButton>
    );
};
