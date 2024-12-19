import Image from "next/image";
import swapButton from "../../../public/swap.svg"


interface swapButtonProp {
    onClick: () => void;
};

export default function SwapButton({ onClick }: swapButtonProp) {
    return (
        <>

            <Image
                onClick={onClick}
                src={swapButton}
                alt="swap button"
                width={25}
                height={25}
            />
        </>
    );
};
