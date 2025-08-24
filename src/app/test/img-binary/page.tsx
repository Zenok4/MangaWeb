import BinImage from "@/components/BinaryImage";

const TestIMG = () => {
  return (
    <div className="flex gap-4 items-start">
      <BinImage url="/image.bin" width={300}/>
      <img src="/001.jpeg" className="w-[300px] object-cover" />
    </div>
  );
};

export default TestIMG;
