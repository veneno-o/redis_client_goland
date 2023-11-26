import Head1 from "../../../assets/images/head1.webp";
import Head2 from "../../../assets/images/head2.webp";
import Head3 from "../../../assets/images/head3.webp";
import Head4 from "../../../assets/images/head4.webp";
import Head5 from "../../../assets/images/head5.webp";
import Head6 from "../../../assets/images/head6.webp";

function randImg() {
  const arr = [Head1, Head2, Head3, Head4, Head5, Head6];
  const len = arr.length;
  return arr[Math.floor(Math.random() * len)];
}

export default function Head() {
  return (
    <div className="w-full h-full flex justify-between items-center  overflow-hidden">
      <div className="text-[18px]">Redis Cilent</div>
      <img
        src={randImg()}
        alt="头像"
        className="w-[40px] h-[40px] rounded-[50%]"
      />
    </div>
  );
}
