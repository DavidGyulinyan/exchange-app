import Image from "next/image";
import currencyIcon from "../../../public/currencyIcon.svg";

interface swapButtonProp {
  onClick: () => void;
}

export default function CurrencyIcon({ onClick }: swapButtonProp) {
  return (
    <>
      <Image
        onClick={onClick}
        src={currencyIcon}
        alt="currency icon"
        width={55}
        height={55}
      />
    </>
  );
}
